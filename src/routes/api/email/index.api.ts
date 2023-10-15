export async function post(ctx: RequestContext) {
    try {
        const body = await ctx.request.json();
        const new_job_apllication = EducationSchema.parse(body);
        const res = await educationApi.addNew({
            input: new_job_apllication,
        });
        return json(res, { status: 200 });
    } catch (error: any) {
        return json(
            {
                error: {
                    message: error.message,
                    original_error: error,
                },
            },
            {
                status: 400,
            },
        );
    }
}
