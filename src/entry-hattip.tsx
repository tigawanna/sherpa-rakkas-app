import { createRequestHandler } from "rakkasjs";
import { cookie } from "@hattip/cookie";
import { auth } from "./lib/auth/lucia/lucia";

export default createRequestHandler({
  middleware: {
    // HatTip middleware to be injected
    // before the page routes handler.
    beforePages: [cookie()],
    // HatTip middleware to be injected
    // after the page routes handler but
    // before the API routes handler
    beforeApiRoutes: [],
    // HatTip middleware to be injected
    // after the API routes handler but
    // before the 404 handler
    beforeNotFound: [],
  },

  createPageHooks(requestContext) {
    return {
      emitBeforeSsrChunk() {
        // Return a string to emit into React's
        // SSR stream just before React emits a
        // chunk of the page.
        return "";
      },

      emitToDocumentHead() {
        // Return a string or ReactElement to emit
        // some HTML into the document's head.
        const cookie_theme = requestContext?.cookie?.theme;
        // inject a script into the page's head to set the data-theme attribute before tha
        // page loads to avoid a flash of the old theme
        return `
      <script>
      (function() {
        document.documentElement.setAttribute("data-theme", "${cookie_theme}");
      })();
     </script>
     `;
      },

      async extendPageContext(ctx) {
        const request = ctx.requestContext?.request;
        if (!request) return;
        const authRequest = auth.handleRequest(request);
        const session = await authRequest.validate(); // or `authRequest.validateBearerToken()`
        const user = session?.user as LuciaUser;
        ctx.queryClient.setQueryData("user", user);
      },

      wrapApp(app) {
        // Wrap the Rakkas application in some provider
        // component (only on the server).
        // return <SomeProvider>{app}</SomeProvider>;
        return app;
      },

      //   wrapSsrStream(stream) {
      //     const { readable, writable } = new TransformStream({
      //       transform(chunk, controller) {
      //         // You can transform the chunks of the
      //         // React SSR stream here.
      //         controller.enqueue(chunk);
      //       },
      //     });
      // // @ts-expect-error
      //     stream.pipeThrough(writable);

      //     return readable;
      //   },
    };
  },
});
