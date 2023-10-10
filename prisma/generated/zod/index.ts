import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','username','email','avatar','name','about_me','github_username','linkedin_username','country','city','phone','skills']);

export const SessionScalarFieldEnumSchema = z.enum(['id','user_id','active_expires','idle_expires']);

export const KeyScalarFieldEnumSchema = z.enum(['id','hashed_password','user_id']);

export const ProjectScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','description','repoUrl','image_url','languages','libraries','userId']);

export const EducationScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','school','qualification','field','from','to','userId']);

export const ExperienceScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','position','company','from','to','description','userId']);

export const ContentScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','title','type','content_url','userId']);

export const HackathonScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','name','description','technologies','from','to','link','userId']);

export const InternshipScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','description','from','to','role','company','userId']);

export const ResumeScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','body','jobAplicationId','userId']);

export const JobApplicationScalarFieldEnumSchema = z.enum(['id','createdAt','updatedAt','job_title','description','job_posting_url','cover_letter','resume','userId','resumeId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const QualificationSchema = z.enum(['Certificate','Bachelors','Masters','PhD']);

export type QualificationType = `${z.infer<typeof QualificationSchema>}`

export const ContentTypeSchema = z.enum(['Video','Blog','Gist','Podcast']);

export type ContentTypeType = `${z.infer<typeof ContentTypeSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().nullable(),
  name: z.string().nullable(),
  about_me: z.string().nullable(),
  github_username: z.string().nullable(),
  linkedin_username: z.string().nullable(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  phone: z.string().nullable(),
  skills: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  active_expires: z.bigint(),
  idle_expires: z.bigint(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// KEY SCHEMA
/////////////////////////////////////////

export const KeySchema = z.object({
  id: z.string(),
  hashed_password: z.string().nullable(),
  user_id: z.string(),
})

export type Key = z.infer<typeof KeySchema>

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  description: z.string(),
  repoUrl: z.string(),
  image_url: z.string().nullable(),
  languages: z.string().array(),
  libraries: z.string().array(),
  userId: z.string().nullable(),
})

export type Project = z.infer<typeof ProjectSchema>

/////////////////////////////////////////
// EDUCATION SCHEMA
/////////////////////////////////////////

export const EducationSchema = z.object({
  qualification: QualificationSchema,
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  school: z.string(),
  field: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  userId: z.string(),
})

export type Education = z.infer<typeof EducationSchema>

/////////////////////////////////////////
// EXPERIENCE SCHEMA
/////////////////////////////////////////

export const ExperienceSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  position: z.string(),
  company: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  description: z.string().nullable(),
  userId: z.string(),
})

export type Experience = z.infer<typeof ExperienceSchema>

/////////////////////////////////////////
// CONTENT SCHEMA
/////////////////////////////////////////

export const ContentSchema = z.object({
  type: ContentTypeSchema,
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  title: z.string(),
  content_url: z.string(),
  userId: z.string().nullable(),
})

export type Content = z.infer<typeof ContentSchema>

/////////////////////////////////////////
// HACKATHON SCHEMA
/////////////////////////////////////////

export const HackathonSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  name: z.string(),
  description: z.string(),
  technologies: z.string().array(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  link: z.string(),
  userId: z.string(),
})

export type Hackathon = z.infer<typeof HackathonSchema>

/////////////////////////////////////////
// INTERNSHIP SCHEMA
/////////////////////////////////////////

export const InternshipSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  description: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  role: z.string(),
  company: z.string(),
  userId: z.string(),
})

export type Internship = z.infer<typeof InternshipSchema>

/////////////////////////////////////////
// RESUME SCHEMA
/////////////////////////////////////////

export const ResumeSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  body: z.string(),
  jobAplicationId: z.string().nullable(),
  userId: z.string(),
})

export type Resume = z.infer<typeof ResumeSchema>

/////////////////////////////////////////
// JOB APPLICATION SCHEMA
/////////////////////////////////////////

export const JobApplicationSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  job_title: z.string(),
  description: z.string(),
  job_posting_url: z.string(),
  cover_letter: z.string(),
  resume: z.string(),
  userId: z.string(),
  resumeId: z.string().nullable(),
})

export type JobApplication = z.infer<typeof JobApplicationSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  auth_session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  key: z.union([z.boolean(),z.lazy(() => KeyFindManyArgsSchema)]).optional(),
  Project: z.union([z.boolean(),z.lazy(() => ProjectFindManyArgsSchema)]).optional(),
  Education: z.union([z.boolean(),z.lazy(() => EducationFindManyArgsSchema)]).optional(),
  Experience: z.union([z.boolean(),z.lazy(() => ExperienceFindManyArgsSchema)]).optional(),
  Content: z.union([z.boolean(),z.lazy(() => ContentFindManyArgsSchema)]).optional(),
  Hackathon: z.union([z.boolean(),z.lazy(() => HackathonFindManyArgsSchema)]).optional(),
  Internship: z.union([z.boolean(),z.lazy(() => InternshipFindManyArgsSchema)]).optional(),
  Resume: z.union([z.boolean(),z.lazy(() => ResumeFindManyArgsSchema)]).optional(),
  JobApplication: z.union([z.boolean(),z.lazy(() => JobApplicationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  auth_session: z.boolean().optional(),
  key: z.boolean().optional(),
  Project: z.boolean().optional(),
  Education: z.boolean().optional(),
  Experience: z.boolean().optional(),
  Content: z.boolean().optional(),
  Hackathon: z.boolean().optional(),
  Internship: z.boolean().optional(),
  Resume: z.boolean().optional(),
  JobApplication: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  username: z.boolean().optional(),
  email: z.boolean().optional(),
  avatar: z.boolean().optional(),
  name: z.boolean().optional(),
  about_me: z.boolean().optional(),
  github_username: z.boolean().optional(),
  linkedin_username: z.boolean().optional(),
  country: z.boolean().optional(),
  city: z.boolean().optional(),
  phone: z.boolean().optional(),
  skills: z.boolean().optional(),
  auth_session: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  key: z.union([z.boolean(),z.lazy(() => KeyFindManyArgsSchema)]).optional(),
  Project: z.union([z.boolean(),z.lazy(() => ProjectFindManyArgsSchema)]).optional(),
  Education: z.union([z.boolean(),z.lazy(() => EducationFindManyArgsSchema)]).optional(),
  Experience: z.union([z.boolean(),z.lazy(() => ExperienceFindManyArgsSchema)]).optional(),
  Content: z.union([z.boolean(),z.lazy(() => ContentFindManyArgsSchema)]).optional(),
  Hackathon: z.union([z.boolean(),z.lazy(() => HackathonFindManyArgsSchema)]).optional(),
  Internship: z.union([z.boolean(),z.lazy(() => InternshipFindManyArgsSchema)]).optional(),
  Resume: z.union([z.boolean(),z.lazy(() => ResumeFindManyArgsSchema)]).optional(),
  JobApplication: z.union([z.boolean(),z.lazy(() => JobApplicationFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  active_expires: z.boolean().optional(),
  idle_expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// KEY
//------------------------------------------------------

export const KeyIncludeSchema: z.ZodType<Prisma.KeyInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const KeyArgsSchema: z.ZodType<Prisma.KeyDefaultArgs> = z.object({
  select: z.lazy(() => KeySelectSchema).optional(),
  include: z.lazy(() => KeyIncludeSchema).optional(),
}).strict();

export const KeySelectSchema: z.ZodType<Prisma.KeySelect> = z.object({
  id: z.boolean().optional(),
  hashed_password: z.boolean().optional(),
  user_id: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// PROJECT
//------------------------------------------------------

export const ProjectIncludeSchema: z.ZodType<Prisma.ProjectInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ProjectArgsSchema: z.ZodType<Prisma.ProjectDefaultArgs> = z.object({
  select: z.lazy(() => ProjectSelectSchema).optional(),
  include: z.lazy(() => ProjectIncludeSchema).optional(),
}).strict();

export const ProjectSelectSchema: z.ZodType<Prisma.ProjectSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  repoUrl: z.boolean().optional(),
  image_url: z.boolean().optional(),
  languages: z.boolean().optional(),
  libraries: z.boolean().optional(),
  userId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// EDUCATION
//------------------------------------------------------

export const EducationIncludeSchema: z.ZodType<Prisma.EducationInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const EducationArgsSchema: z.ZodType<Prisma.EducationDefaultArgs> = z.object({
  select: z.lazy(() => EducationSelectSchema).optional(),
  include: z.lazy(() => EducationIncludeSchema).optional(),
}).strict();

export const EducationSelectSchema: z.ZodType<Prisma.EducationSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  school: z.boolean().optional(),
  qualification: z.boolean().optional(),
  field: z.boolean().optional(),
  from: z.boolean().optional(),
  to: z.boolean().optional(),
  userId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// EXPERIENCE
//------------------------------------------------------

export const ExperienceIncludeSchema: z.ZodType<Prisma.ExperienceInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ExperienceArgsSchema: z.ZodType<Prisma.ExperienceDefaultArgs> = z.object({
  select: z.lazy(() => ExperienceSelectSchema).optional(),
  include: z.lazy(() => ExperienceIncludeSchema).optional(),
}).strict();

export const ExperienceSelectSchema: z.ZodType<Prisma.ExperienceSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  position: z.boolean().optional(),
  company: z.boolean().optional(),
  from: z.boolean().optional(),
  to: z.boolean().optional(),
  description: z.boolean().optional(),
  userId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// CONTENT
//------------------------------------------------------

export const ContentIncludeSchema: z.ZodType<Prisma.ContentInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ContentArgsSchema: z.ZodType<Prisma.ContentDefaultArgs> = z.object({
  select: z.lazy(() => ContentSelectSchema).optional(),
  include: z.lazy(() => ContentIncludeSchema).optional(),
}).strict();

export const ContentSelectSchema: z.ZodType<Prisma.ContentSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  title: z.boolean().optional(),
  type: z.boolean().optional(),
  content_url: z.boolean().optional(),
  userId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// HACKATHON
//------------------------------------------------------

export const HackathonIncludeSchema: z.ZodType<Prisma.HackathonInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const HackathonArgsSchema: z.ZodType<Prisma.HackathonDefaultArgs> = z.object({
  select: z.lazy(() => HackathonSelectSchema).optional(),
  include: z.lazy(() => HackathonIncludeSchema).optional(),
}).strict();

export const HackathonSelectSchema: z.ZodType<Prisma.HackathonSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  name: z.boolean().optional(),
  description: z.boolean().optional(),
  technologies: z.boolean().optional(),
  from: z.boolean().optional(),
  to: z.boolean().optional(),
  link: z.boolean().optional(),
  userId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// INTERNSHIP
//------------------------------------------------------

export const InternshipIncludeSchema: z.ZodType<Prisma.InternshipInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const InternshipArgsSchema: z.ZodType<Prisma.InternshipDefaultArgs> = z.object({
  select: z.lazy(() => InternshipSelectSchema).optional(),
  include: z.lazy(() => InternshipIncludeSchema).optional(),
}).strict();

export const InternshipSelectSchema: z.ZodType<Prisma.InternshipSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  description: z.boolean().optional(),
  from: z.boolean().optional(),
  to: z.boolean().optional(),
  role: z.boolean().optional(),
  company: z.boolean().optional(),
  userId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// RESUME
//------------------------------------------------------

export const ResumeIncludeSchema: z.ZodType<Prisma.ResumeInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ResumeArgsSchema: z.ZodType<Prisma.ResumeDefaultArgs> = z.object({
  select: z.lazy(() => ResumeSelectSchema).optional(),
  include: z.lazy(() => ResumeIncludeSchema).optional(),
}).strict();

export const ResumeSelectSchema: z.ZodType<Prisma.ResumeSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  body: z.boolean().optional(),
  jobAplicationId: z.boolean().optional(),
  userId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// JOB APPLICATION
//------------------------------------------------------

export const JobApplicationIncludeSchema: z.ZodType<Prisma.JobApplicationInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const JobApplicationArgsSchema: z.ZodType<Prisma.JobApplicationDefaultArgs> = z.object({
  select: z.lazy(() => JobApplicationSelectSchema).optional(),
  include: z.lazy(() => JobApplicationIncludeSchema).optional(),
}).strict();

export const JobApplicationSelectSchema: z.ZodType<Prisma.JobApplicationSelect> = z.object({
  id: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  job_title: z.boolean().optional(),
  description: z.boolean().optional(),
  job_posting_url: z.boolean().optional(),
  cover_letter: z.boolean().optional(),
  resume: z.boolean().optional(),
  userId: z.boolean().optional(),
  resumeId: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  about_me: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  github_username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  linkedin_username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  skills: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  auth_session: z.lazy(() => SessionListRelationFilterSchema).optional(),
  key: z.lazy(() => KeyListRelationFilterSchema).optional(),
  Project: z.lazy(() => ProjectListRelationFilterSchema).optional(),
  Education: z.lazy(() => EducationListRelationFilterSchema).optional(),
  Experience: z.lazy(() => ExperienceListRelationFilterSchema).optional(),
  Content: z.lazy(() => ContentListRelationFilterSchema).optional(),
  Hackathon: z.lazy(() => HackathonListRelationFilterSchema).optional(),
  Internship: z.lazy(() => InternshipListRelationFilterSchema).optional(),
  Resume: z.lazy(() => ResumeListRelationFilterSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  about_me: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  github_username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  linkedin_username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  country: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  city: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  skills: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  auth_session: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  key: z.lazy(() => KeyOrderByRelationAggregateInputSchema).optional(),
  Project: z.lazy(() => ProjectOrderByRelationAggregateInputSchema).optional(),
  Education: z.lazy(() => EducationOrderByRelationAggregateInputSchema).optional(),
  Experience: z.lazy(() => ExperienceOrderByRelationAggregateInputSchema).optional(),
  Content: z.lazy(() => ContentOrderByRelationAggregateInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonOrderByRelationAggregateInputSchema).optional(),
  Internship: z.lazy(() => InternshipOrderByRelationAggregateInputSchema).optional(),
  Resume: z.lazy(() => ResumeOrderByRelationAggregateInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    username: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
    username: z.string(),
  }),
  z.object({
    id: z.string(),
    email: z.string(),
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    username: z.string(),
    email: z.string(),
  }),
  z.object({
    username: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  username: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  about_me: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  github_username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  linkedin_username: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  skills: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  auth_session: z.lazy(() => SessionListRelationFilterSchema).optional(),
  key: z.lazy(() => KeyListRelationFilterSchema).optional(),
  Project: z.lazy(() => ProjectListRelationFilterSchema).optional(),
  Education: z.lazy(() => EducationListRelationFilterSchema).optional(),
  Experience: z.lazy(() => ExperienceListRelationFilterSchema).optional(),
  Content: z.lazy(() => ContentListRelationFilterSchema).optional(),
  Hackathon: z.lazy(() => HackathonListRelationFilterSchema).optional(),
  Internship: z.lazy(() => InternshipListRelationFilterSchema).optional(),
  Resume: z.lazy(() => ResumeListRelationFilterSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  about_me: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  github_username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  linkedin_username: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  country: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  city: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  skills: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  about_me: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  github_username: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  linkedin_username: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  country: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  skills: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active_expires: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  idle_expires: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  active_expires: z.lazy(() => SortOrderSchema).optional(),
  idle_expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active_expires: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  idle_expires: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  active_expires: z.lazy(() => SortOrderSchema).optional(),
  idle_expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => SessionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => SessionSumOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  active_expires: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
  idle_expires: z.union([ z.lazy(() => BigIntWithAggregatesFilterSchema),z.bigint() ]).optional(),
}).strict();

export const KeyWhereInputSchema: z.ZodType<Prisma.KeyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KeyWhereInputSchema),z.lazy(() => KeyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KeyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KeyWhereInputSchema),z.lazy(() => KeyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hashed_password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const KeyOrderByWithRelationInputSchema: z.ZodType<Prisma.KeyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hashed_password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const KeyWhereUniqueInputSchema: z.ZodType<Prisma.KeyWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => KeyWhereInputSchema),z.lazy(() => KeyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KeyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KeyWhereInputSchema),z.lazy(() => KeyWhereInputSchema).array() ]).optional(),
  hashed_password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const KeyOrderByWithAggregationInputSchema: z.ZodType<Prisma.KeyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hashed_password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => KeyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => KeyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => KeyMinOrderByAggregateInputSchema).optional()
}).strict();

export const KeyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.KeyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => KeyScalarWhereWithAggregatesInputSchema),z.lazy(() => KeyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => KeyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KeyScalarWhereWithAggregatesInputSchema),z.lazy(() => KeyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hashed_password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ProjectWhereInputSchema: z.ZodType<Prisma.ProjectWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  repoUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  languages: z.lazy(() => StringNullableListFilterSchema).optional(),
  libraries: z.lazy(() => StringNullableListFilterSchema).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  repoUrl: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  languages: z.lazy(() => SortOrderSchema).optional(),
  libraries: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ProjectWhereUniqueInputSchema: z.ZodType<Prisma.ProjectWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  repoUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  languages: z.lazy(() => StringNullableListFilterSchema).optional(),
  libraries: z.lazy(() => StringNullableListFilterSchema).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ProjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  repoUrl: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  languages: z.lazy(() => SortOrderSchema).optional(),
  libraries: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ProjectCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  repoUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  image_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  languages: z.lazy(() => StringNullableListFilterSchema).optional(),
  libraries: z.lazy(() => StringNullableListFilterSchema).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const EducationWhereInputSchema: z.ZodType<Prisma.EducationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EducationWhereInputSchema),z.lazy(() => EducationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EducationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EducationWhereInputSchema),z.lazy(() => EducationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  school: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  qualification: z.union([ z.lazy(() => EnumQualificationFilterSchema),z.lazy(() => QualificationSchema) ]).optional(),
  field: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const EducationOrderByWithRelationInputSchema: z.ZodType<Prisma.EducationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  school: z.lazy(() => SortOrderSchema).optional(),
  qualification: z.lazy(() => SortOrderSchema).optional(),
  field: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const EducationWhereUniqueInputSchema: z.ZodType<Prisma.EducationWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => EducationWhereInputSchema),z.lazy(() => EducationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EducationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EducationWhereInputSchema),z.lazy(() => EducationWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  school: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  qualification: z.union([ z.lazy(() => EnumQualificationFilterSchema),z.lazy(() => QualificationSchema) ]).optional(),
  field: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const EducationOrderByWithAggregationInputSchema: z.ZodType<Prisma.EducationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  school: z.lazy(() => SortOrderSchema).optional(),
  qualification: z.lazy(() => SortOrderSchema).optional(),
  field: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => EducationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => EducationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => EducationMinOrderByAggregateInputSchema).optional()
}).strict();

export const EducationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.EducationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => EducationScalarWhereWithAggregatesInputSchema),z.lazy(() => EducationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => EducationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EducationScalarWhereWithAggregatesInputSchema),z.lazy(() => EducationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  school: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  qualification: z.union([ z.lazy(() => EnumQualificationWithAggregatesFilterSchema),z.lazy(() => QualificationSchema) ]).optional(),
  field: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ExperienceWhereInputSchema: z.ZodType<Prisma.ExperienceWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExperienceWhereInputSchema),z.lazy(() => ExperienceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExperienceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExperienceWhereInputSchema),z.lazy(() => ExperienceWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  position: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ExperienceOrderByWithRelationInputSchema: z.ZodType<Prisma.ExperienceOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ExperienceWhereUniqueInputSchema: z.ZodType<Prisma.ExperienceWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => ExperienceWhereInputSchema),z.lazy(() => ExperienceWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExperienceWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExperienceWhereInputSchema),z.lazy(() => ExperienceWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  position: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ExperienceOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExperienceOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  description: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ExperienceCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExperienceMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExperienceMinOrderByAggregateInputSchema).optional()
}).strict();

export const ExperienceScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExperienceScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExperienceScalarWhereWithAggregatesInputSchema),z.lazy(() => ExperienceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExperienceScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExperienceScalarWhereWithAggregatesInputSchema),z.lazy(() => ExperienceScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  position: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ContentWhereInputSchema: z.ZodType<Prisma.ContentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContentWhereInputSchema),z.lazy(() => ContentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContentWhereInputSchema),z.lazy(() => ContentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumContentTypeFilterSchema),z.lazy(() => ContentTypeSchema) ]).optional(),
  content_url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ContentOrderByWithRelationInputSchema: z.ZodType<Prisma.ContentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content_url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ContentWhereUniqueInputSchema: z.ZodType<Prisma.ContentWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => ContentWhereInputSchema),z.lazy(() => ContentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContentWhereInputSchema),z.lazy(() => ContentWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumContentTypeFilterSchema),z.lazy(() => ContentTypeSchema) ]).optional(),
  content_url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ContentOrderByWithAggregationInputSchema: z.ZodType<Prisma.ContentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content_url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ContentCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ContentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ContentMinOrderByAggregateInputSchema).optional()
}).strict();

export const ContentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ContentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ContentScalarWhereWithAggregatesInputSchema),z.lazy(() => ContentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContentScalarWhereWithAggregatesInputSchema),z.lazy(() => ContentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumContentTypeWithAggregatesFilterSchema),z.lazy(() => ContentTypeSchema) ]).optional(),
  content_url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const HackathonWhereInputSchema: z.ZodType<Prisma.HackathonWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HackathonWhereInputSchema),z.lazy(() => HackathonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HackathonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HackathonWhereInputSchema),z.lazy(() => HackathonWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  technologies: z.lazy(() => StringNullableListFilterSchema).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  link: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const HackathonOrderByWithRelationInputSchema: z.ZodType<Prisma.HackathonOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  technologies: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const HackathonWhereUniqueInputSchema: z.ZodType<Prisma.HackathonWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => HackathonWhereInputSchema),z.lazy(() => HackathonWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HackathonWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HackathonWhereInputSchema),z.lazy(() => HackathonWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  technologies: z.lazy(() => StringNullableListFilterSchema).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  link: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const HackathonOrderByWithAggregationInputSchema: z.ZodType<Prisma.HackathonOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  technologies: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => HackathonCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => HackathonMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => HackathonMinOrderByAggregateInputSchema).optional()
}).strict();

export const HackathonScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HackathonScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => HackathonScalarWhereWithAggregatesInputSchema),z.lazy(() => HackathonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => HackathonScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HackathonScalarWhereWithAggregatesInputSchema),z.lazy(() => HackathonScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  technologies: z.lazy(() => StringNullableListFilterSchema).optional(),
  from: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  link: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const InternshipWhereInputSchema: z.ZodType<Prisma.InternshipWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InternshipWhereInputSchema),z.lazy(() => InternshipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InternshipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InternshipWhereInputSchema),z.lazy(() => InternshipWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const InternshipOrderByWithRelationInputSchema: z.ZodType<Prisma.InternshipOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const InternshipWhereUniqueInputSchema: z.ZodType<Prisma.InternshipWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => InternshipWhereInputSchema),z.lazy(() => InternshipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InternshipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InternshipWhereInputSchema),z.lazy(() => InternshipWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const InternshipOrderByWithAggregationInputSchema: z.ZodType<Prisma.InternshipOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InternshipCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InternshipMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InternshipMinOrderByAggregateInputSchema).optional()
}).strict();

export const InternshipScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InternshipScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InternshipScalarWhereWithAggregatesInputSchema),z.lazy(() => InternshipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InternshipScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InternshipScalarWhereWithAggregatesInputSchema),z.lazy(() => InternshipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ResumeWhereInputSchema: z.ZodType<Prisma.ResumeWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ResumeWhereInputSchema),z.lazy(() => ResumeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResumeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResumeWhereInputSchema),z.lazy(() => ResumeWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobAplicationId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ResumeOrderByWithRelationInputSchema: z.ZodType<Prisma.ResumeOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  jobAplicationId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const ResumeWhereUniqueInputSchema: z.ZodType<Prisma.ResumeWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => ResumeWhereInputSchema),z.lazy(() => ResumeWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResumeWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResumeWhereInputSchema),z.lazy(() => ResumeWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobAplicationId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ResumeOrderByWithAggregationInputSchema: z.ZodType<Prisma.ResumeOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  jobAplicationId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ResumeCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ResumeMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ResumeMinOrderByAggregateInputSchema).optional()
}).strict();

export const ResumeScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ResumeScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ResumeScalarWhereWithAggregatesInputSchema),z.lazy(() => ResumeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResumeScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResumeScalarWhereWithAggregatesInputSchema),z.lazy(() => ResumeScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  body: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  jobAplicationId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const JobApplicationWhereInputSchema: z.ZodType<Prisma.JobApplicationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobApplicationWhereInputSchema),z.lazy(() => JobApplicationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobApplicationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobApplicationWhereInputSchema),z.lazy(() => JobApplicationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  job_title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  job_posting_url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cover_letter: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  resume: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  resumeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict();

export const JobApplicationOrderByWithRelationInputSchema: z.ZodType<Prisma.JobApplicationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  job_title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  job_posting_url: z.lazy(() => SortOrderSchema).optional(),
  cover_letter: z.lazy(() => SortOrderSchema).optional(),
  resume: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  resumeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const JobApplicationWhereUniqueInputSchema: z.ZodType<Prisma.JobApplicationWhereUniqueInput> = z.object({
  id: z.string().uuid()
})
.and(z.object({
  id: z.string().uuid().optional(),
  AND: z.union([ z.lazy(() => JobApplicationWhereInputSchema),z.lazy(() => JobApplicationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobApplicationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobApplicationWhereInputSchema),z.lazy(() => JobApplicationWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  job_title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  job_posting_url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cover_letter: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  resume: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  resumeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  User: z.union([ z.lazy(() => UserNullableRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional().nullable(),
}).strict());

export const JobApplicationOrderByWithAggregationInputSchema: z.ZodType<Prisma.JobApplicationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  job_title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  job_posting_url: z.lazy(() => SortOrderSchema).optional(),
  cover_letter: z.lazy(() => SortOrderSchema).optional(),
  resume: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  resumeId: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => JobApplicationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JobApplicationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JobApplicationMinOrderByAggregateInputSchema).optional()
}).strict();

export const JobApplicationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JobApplicationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => JobApplicationScalarWhereWithAggregatesInputSchema),z.lazy(() => JobApplicationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobApplicationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobApplicationScalarWhereWithAggregatesInputSchema),z.lazy(() => JobApplicationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  job_title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  job_posting_url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  cover_letter: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  resume: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  resumeId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string(),
  active_expires: z.bigint(),
  idle_expires: z.bigint(),
  user: z.lazy(() => UserCreateNestedOneWithoutAuth_sessionInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string(),
  user_id: z.string(),
  active_expires: z.bigint(),
  idle_expires: z.bigint()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  idle_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAuth_sessionNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  idle_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string(),
  user_id: z.string(),
  active_expires: z.bigint(),
  idle_expires: z.bigint()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  idle_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  idle_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KeyCreateInputSchema: z.ZodType<Prisma.KeyCreateInput> = z.object({
  id: z.string(),
  hashed_password: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutKeyInputSchema)
}).strict();

export const KeyUncheckedCreateInputSchema: z.ZodType<Prisma.KeyUncheckedCreateInput> = z.object({
  id: z.string(),
  hashed_password: z.string().optional().nullable(),
  user_id: z.string()
}).strict();

export const KeyUpdateInputSchema: z.ZodType<Prisma.KeyUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashed_password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutKeyNestedInputSchema).optional()
}).strict();

export const KeyUncheckedUpdateInputSchema: z.ZodType<Prisma.KeyUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashed_password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KeyCreateManyInputSchema: z.ZodType<Prisma.KeyCreateManyInput> = z.object({
  id: z.string(),
  hashed_password: z.string().optional().nullable(),
  user_id: z.string()
}).strict();

export const KeyUpdateManyMutationInputSchema: z.ZodType<Prisma.KeyUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashed_password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const KeyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.KeyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashed_password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectCreateInputSchema: z.ZodType<Prisma.ProjectCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  repoUrl: z.string(),
  image_url: z.string().optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectCreatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectCreatelibrariesInputSchema),z.string().array() ]).optional(),
  User: z.lazy(() => UserCreateNestedOneWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  repoUrl: z.string(),
  image_url: z.string().optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectCreatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectCreatelibrariesInputSchema),z.string().array() ]).optional(),
  userId: z.string().optional().nullable()
}).strict();

export const ProjectUpdateInputSchema: z.ZodType<Prisma.ProjectUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectUpdatelibrariesInputSchema),z.string().array() ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectUpdatelibrariesInputSchema),z.string().array() ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectCreateManyInputSchema: z.ZodType<Prisma.ProjectCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  repoUrl: z.string(),
  image_url: z.string().optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectCreatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectCreatelibrariesInputSchema),z.string().array() ]).optional(),
  userId: z.string().optional().nullable()
}).strict();

export const ProjectUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectUpdatelibrariesInputSchema),z.string().array() ]).optional(),
}).strict();

export const ProjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectUpdatelibrariesInputSchema),z.string().array() ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const EducationCreateInputSchema: z.ZodType<Prisma.EducationCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  school: z.string(),
  qualification: z.lazy(() => QualificationSchema),
  field: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  User: z.lazy(() => UserCreateNestedOneWithoutEducationInputSchema).optional()
}).strict();

export const EducationUncheckedCreateInputSchema: z.ZodType<Prisma.EducationUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  school: z.string(),
  qualification: z.lazy(() => QualificationSchema),
  field: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  userId: z.string()
}).strict();

export const EducationUpdateInputSchema: z.ZodType<Prisma.EducationUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  qualification: z.union([ z.lazy(() => QualificationSchema),z.lazy(() => EnumQualificationFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutEducationNestedInputSchema).optional()
}).strict();

export const EducationUncheckedUpdateInputSchema: z.ZodType<Prisma.EducationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  qualification: z.union([ z.lazy(() => QualificationSchema),z.lazy(() => EnumQualificationFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EducationCreateManyInputSchema: z.ZodType<Prisma.EducationCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  school: z.string(),
  qualification: z.lazy(() => QualificationSchema),
  field: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  userId: z.string()
}).strict();

export const EducationUpdateManyMutationInputSchema: z.ZodType<Prisma.EducationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  qualification: z.union([ z.lazy(() => QualificationSchema),z.lazy(() => EnumQualificationFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EducationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.EducationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  qualification: z.union([ z.lazy(() => QualificationSchema),z.lazy(() => EnumQualificationFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExperienceCreateInputSchema: z.ZodType<Prisma.ExperienceCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  position: z.string(),
  company: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  description: z.string().optional().nullable(),
  User: z.lazy(() => UserCreateNestedOneWithoutExperienceInputSchema).optional()
}).strict();

export const ExperienceUncheckedCreateInputSchema: z.ZodType<Prisma.ExperienceUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  position: z.string(),
  company: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  description: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const ExperienceUpdateInputSchema: z.ZodType<Prisma.ExperienceUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUpdateOneWithoutExperienceNestedInputSchema).optional()
}).strict();

export const ExperienceUncheckedUpdateInputSchema: z.ZodType<Prisma.ExperienceUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExperienceCreateManyInputSchema: z.ZodType<Prisma.ExperienceCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  position: z.string(),
  company: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  description: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const ExperienceUpdateManyMutationInputSchema: z.ZodType<Prisma.ExperienceUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ExperienceUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExperienceUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContentCreateInputSchema: z.ZodType<Prisma.ContentCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  type: z.lazy(() => ContentTypeSchema),
  content_url: z.string(),
  User: z.lazy(() => UserCreateNestedOneWithoutContentInputSchema).optional()
}).strict();

export const ContentUncheckedCreateInputSchema: z.ZodType<Prisma.ContentUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  type: z.lazy(() => ContentTypeSchema),
  content_url: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const ContentUpdateInputSchema: z.ZodType<Prisma.ContentUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContentTypeSchema),z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutContentNestedInputSchema).optional()
}).strict();

export const ContentUncheckedUpdateInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContentTypeSchema),z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ContentCreateManyInputSchema: z.ZodType<Prisma.ContentCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  type: z.lazy(() => ContentTypeSchema),
  content_url: z.string(),
  userId: z.string().optional().nullable()
}).strict();

export const ContentUpdateManyMutationInputSchema: z.ZodType<Prisma.ContentUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContentTypeSchema),z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContentTypeSchema),z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const HackathonCreateInputSchema: z.ZodType<Prisma.HackathonCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  technologies: z.union([ z.lazy(() => HackathonCreatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  link: z.string(),
  User: z.lazy(() => UserCreateNestedOneWithoutHackathonInputSchema).optional()
}).strict();

export const HackathonUncheckedCreateInputSchema: z.ZodType<Prisma.HackathonUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  technologies: z.union([ z.lazy(() => HackathonCreatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  link: z.string(),
  userId: z.string()
}).strict();

export const HackathonUpdateInputSchema: z.ZodType<Prisma.HackathonUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  technologies: z.union([ z.lazy(() => HackathonUpdatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutHackathonNestedInputSchema).optional()
}).strict();

export const HackathonUncheckedUpdateInputSchema: z.ZodType<Prisma.HackathonUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  technologies: z.union([ z.lazy(() => HackathonUpdatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HackathonCreateManyInputSchema: z.ZodType<Prisma.HackathonCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  technologies: z.union([ z.lazy(() => HackathonCreatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  link: z.string(),
  userId: z.string()
}).strict();

export const HackathonUpdateManyMutationInputSchema: z.ZodType<Prisma.HackathonUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  technologies: z.union([ z.lazy(() => HackathonUpdatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HackathonUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HackathonUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  technologies: z.union([ z.lazy(() => HackathonUpdatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InternshipCreateInputSchema: z.ZodType<Prisma.InternshipCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  description: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  role: z.string(),
  company: z.string(),
  User: z.lazy(() => UserCreateNestedOneWithoutInternshipInputSchema).optional()
}).strict();

export const InternshipUncheckedCreateInputSchema: z.ZodType<Prisma.InternshipUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  description: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  role: z.string(),
  company: z.string(),
  userId: z.string()
}).strict();

export const InternshipUpdateInputSchema: z.ZodType<Prisma.InternshipUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneWithoutInternshipNestedInputSchema).optional()
}).strict();

export const InternshipUncheckedUpdateInputSchema: z.ZodType<Prisma.InternshipUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InternshipCreateManyInputSchema: z.ZodType<Prisma.InternshipCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  description: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  role: z.string(),
  company: z.string(),
  userId: z.string()
}).strict();

export const InternshipUpdateManyMutationInputSchema: z.ZodType<Prisma.InternshipUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InternshipUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InternshipUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResumeCreateInputSchema: z.ZodType<Prisma.ResumeCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  body: z.string(),
  jobAplicationId: z.string().optional().nullable(),
  User: z.lazy(() => UserCreateNestedOneWithoutResumeInputSchema).optional()
}).strict();

export const ResumeUncheckedCreateInputSchema: z.ZodType<Prisma.ResumeUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  body: z.string(),
  jobAplicationId: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const ResumeUpdateInputSchema: z.ZodType<Prisma.ResumeUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobAplicationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUpdateOneWithoutResumeNestedInputSchema).optional()
}).strict();

export const ResumeUncheckedUpdateInputSchema: z.ZodType<Prisma.ResumeUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobAplicationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResumeCreateManyInputSchema: z.ZodType<Prisma.ResumeCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  body: z.string(),
  jobAplicationId: z.string().optional().nullable(),
  userId: z.string()
}).strict();

export const ResumeUpdateManyMutationInputSchema: z.ZodType<Prisma.ResumeUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobAplicationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ResumeUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ResumeUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobAplicationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobApplicationCreateInputSchema: z.ZodType<Prisma.JobApplicationCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  job_title: z.string(),
  description: z.string(),
  job_posting_url: z.string(),
  cover_letter: z.string(),
  resume: z.string(),
  resumeId: z.string().optional().nullable(),
  User: z.lazy(() => UserCreateNestedOneWithoutJobApplicationInputSchema).optional()
}).strict();

export const JobApplicationUncheckedCreateInputSchema: z.ZodType<Prisma.JobApplicationUncheckedCreateInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  job_title: z.string(),
  description: z.string(),
  job_posting_url: z.string(),
  cover_letter: z.string(),
  resume: z.string(),
  userId: z.string(),
  resumeId: z.string().optional().nullable()
}).strict();

export const JobApplicationUpdateInputSchema: z.ZodType<Prisma.JobApplicationUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  job_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job_posting_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cover_letter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  User: z.lazy(() => UserUpdateOneWithoutJobApplicationNestedInputSchema).optional()
}).strict();

export const JobApplicationUncheckedUpdateInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  job_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job_posting_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cover_letter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const JobApplicationCreateManyInputSchema: z.ZodType<Prisma.JobApplicationCreateManyInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  job_title: z.string(),
  description: z.string(),
  job_posting_url: z.string(),
  cover_letter: z.string(),
  resume: z.string(),
  userId: z.string(),
  resumeId: z.string().optional().nullable()
}).strict();

export const JobApplicationUpdateManyMutationInputSchema: z.ZodType<Prisma.JobApplicationUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  job_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job_posting_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cover_letter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const JobApplicationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  job_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job_posting_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cover_letter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const KeyListRelationFilterSchema: z.ZodType<Prisma.KeyListRelationFilter> = z.object({
  every: z.lazy(() => KeyWhereInputSchema).optional(),
  some: z.lazy(() => KeyWhereInputSchema).optional(),
  none: z.lazy(() => KeyWhereInputSchema).optional()
}).strict();

export const ProjectListRelationFilterSchema: z.ZodType<Prisma.ProjectListRelationFilter> = z.object({
  every: z.lazy(() => ProjectWhereInputSchema).optional(),
  some: z.lazy(() => ProjectWhereInputSchema).optional(),
  none: z.lazy(() => ProjectWhereInputSchema).optional()
}).strict();

export const EducationListRelationFilterSchema: z.ZodType<Prisma.EducationListRelationFilter> = z.object({
  every: z.lazy(() => EducationWhereInputSchema).optional(),
  some: z.lazy(() => EducationWhereInputSchema).optional(),
  none: z.lazy(() => EducationWhereInputSchema).optional()
}).strict();

export const ExperienceListRelationFilterSchema: z.ZodType<Prisma.ExperienceListRelationFilter> = z.object({
  every: z.lazy(() => ExperienceWhereInputSchema).optional(),
  some: z.lazy(() => ExperienceWhereInputSchema).optional(),
  none: z.lazy(() => ExperienceWhereInputSchema).optional()
}).strict();

export const ContentListRelationFilterSchema: z.ZodType<Prisma.ContentListRelationFilter> = z.object({
  every: z.lazy(() => ContentWhereInputSchema).optional(),
  some: z.lazy(() => ContentWhereInputSchema).optional(),
  none: z.lazy(() => ContentWhereInputSchema).optional()
}).strict();

export const HackathonListRelationFilterSchema: z.ZodType<Prisma.HackathonListRelationFilter> = z.object({
  every: z.lazy(() => HackathonWhereInputSchema).optional(),
  some: z.lazy(() => HackathonWhereInputSchema).optional(),
  none: z.lazy(() => HackathonWhereInputSchema).optional()
}).strict();

export const InternshipListRelationFilterSchema: z.ZodType<Prisma.InternshipListRelationFilter> = z.object({
  every: z.lazy(() => InternshipWhereInputSchema).optional(),
  some: z.lazy(() => InternshipWhereInputSchema).optional(),
  none: z.lazy(() => InternshipWhereInputSchema).optional()
}).strict();

export const ResumeListRelationFilterSchema: z.ZodType<Prisma.ResumeListRelationFilter> = z.object({
  every: z.lazy(() => ResumeWhereInputSchema).optional(),
  some: z.lazy(() => ResumeWhereInputSchema).optional(),
  none: z.lazy(() => ResumeWhereInputSchema).optional()
}).strict();

export const JobApplicationListRelationFilterSchema: z.ZodType<Prisma.JobApplicationListRelationFilter> = z.object({
  every: z.lazy(() => JobApplicationWhereInputSchema).optional(),
  some: z.lazy(() => JobApplicationWhereInputSchema).optional(),
  none: z.lazy(() => JobApplicationWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KeyOrderByRelationAggregateInputSchema: z.ZodType<Prisma.KeyOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ProjectOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EducationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.EducationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExperienceOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ExperienceOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ContentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HackathonOrderByRelationAggregateInputSchema: z.ZodType<Prisma.HackathonOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InternshipOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InternshipOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResumeOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ResumeOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobApplicationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JobApplicationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about_me: z.lazy(() => SortOrderSchema).optional(),
  github_username: z.lazy(() => SortOrderSchema).optional(),
  linkedin_username: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  skills: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about_me: z.lazy(() => SortOrderSchema).optional(),
  github_username: z.lazy(() => SortOrderSchema).optional(),
  linkedin_username: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  skills: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  about_me: z.lazy(() => SortOrderSchema).optional(),
  github_username: z.lazy(() => SortOrderSchema).optional(),
  linkedin_username: z.lazy(() => SortOrderSchema).optional(),
  country: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  skills: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const BigIntFilterSchema: z.ZodType<Prisma.BigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  active_expires: z.lazy(() => SortOrderSchema).optional(),
  idle_expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SessionAvgOrderByAggregateInput> = z.object({
  active_expires: z.lazy(() => SortOrderSchema).optional(),
  idle_expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  active_expires: z.lazy(() => SortOrderSchema).optional(),
  idle_expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  active_expires: z.lazy(() => SortOrderSchema).optional(),
  idle_expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionSumOrderByAggregateInputSchema: z.ZodType<Prisma.SessionSumOrderByAggregateInput> = z.object({
  active_expires: z.lazy(() => SortOrderSchema).optional(),
  idle_expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BigIntWithAggregatesFilterSchema: z.ZodType<Prisma.BigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional()
}).strict();

export const KeyCountOrderByAggregateInputSchema: z.ZodType<Prisma.KeyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hashed_password: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KeyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.KeyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hashed_password: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const KeyMinOrderByAggregateInputSchema: z.ZodType<Prisma.KeyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hashed_password: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> = z.object({
  equals: z.string().array().optional().nullable(),
  has: z.string().optional().nullable(),
  hasEvery: z.string().array().optional(),
  hasSome: z.string().array().optional(),
  isEmpty: z.boolean().optional()
}).strict();

export const UserNullableRelationFilterSchema: z.ZodType<Prisma.UserNullableRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => UserWhereInputSchema).optional().nullable()
}).strict();

export const ProjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  repoUrl: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  languages: z.lazy(() => SortOrderSchema).optional(),
  libraries: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  repoUrl: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  repoUrl: z.lazy(() => SortOrderSchema).optional(),
  image_url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumQualificationFilterSchema: z.ZodType<Prisma.EnumQualificationFilter> = z.object({
  equals: z.lazy(() => QualificationSchema).optional(),
  in: z.lazy(() => QualificationSchema).array().optional(),
  notIn: z.lazy(() => QualificationSchema).array().optional(),
  not: z.union([ z.lazy(() => QualificationSchema),z.lazy(() => NestedEnumQualificationFilterSchema) ]).optional(),
}).strict();

export const EducationCountOrderByAggregateInputSchema: z.ZodType<Prisma.EducationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  school: z.lazy(() => SortOrderSchema).optional(),
  qualification: z.lazy(() => SortOrderSchema).optional(),
  field: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EducationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.EducationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  school: z.lazy(() => SortOrderSchema).optional(),
  qualification: z.lazy(() => SortOrderSchema).optional(),
  field: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EducationMinOrderByAggregateInputSchema: z.ZodType<Prisma.EducationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  school: z.lazy(() => SortOrderSchema).optional(),
  qualification: z.lazy(() => SortOrderSchema).optional(),
  field: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumQualificationWithAggregatesFilterSchema: z.ZodType<Prisma.EnumQualificationWithAggregatesFilter> = z.object({
  equals: z.lazy(() => QualificationSchema).optional(),
  in: z.lazy(() => QualificationSchema).array().optional(),
  notIn: z.lazy(() => QualificationSchema).array().optional(),
  not: z.union([ z.lazy(() => QualificationSchema),z.lazy(() => NestedEnumQualificationWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumQualificationFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumQualificationFilterSchema).optional()
}).strict();

export const ExperienceCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExperienceCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExperienceMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExperienceMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ExperienceMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExperienceMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumContentTypeFilterSchema: z.ZodType<Prisma.EnumContentTypeFilter> = z.object({
  equals: z.lazy(() => ContentTypeSchema).optional(),
  in: z.lazy(() => ContentTypeSchema).array().optional(),
  notIn: z.lazy(() => ContentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ContentTypeSchema),z.lazy(() => NestedEnumContentTypeFilterSchema) ]).optional(),
}).strict();

export const ContentCountOrderByAggregateInputSchema: z.ZodType<Prisma.ContentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content_url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ContentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content_url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ContentMinOrderByAggregateInputSchema: z.ZodType<Prisma.ContentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  content_url: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumContentTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumContentTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ContentTypeSchema).optional(),
  in: z.lazy(() => ContentTypeSchema).array().optional(),
  notIn: z.lazy(() => ContentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ContentTypeSchema),z.lazy(() => NestedEnumContentTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumContentTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumContentTypeFilterSchema).optional()
}).strict();

export const HackathonCountOrderByAggregateInputSchema: z.ZodType<Prisma.HackathonCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  technologies: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HackathonMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HackathonMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const HackathonMinOrderByAggregateInputSchema: z.ZodType<Prisma.HackathonMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  link: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InternshipCountOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InternshipMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InternshipMinOrderByAggregateInputSchema: z.ZodType<Prisma.InternshipMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  from: z.lazy(() => SortOrderSchema).optional(),
  to: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResumeCountOrderByAggregateInputSchema: z.ZodType<Prisma.ResumeCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  jobAplicationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResumeMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ResumeMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  jobAplicationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ResumeMinOrderByAggregateInputSchema: z.ZodType<Prisma.ResumeMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  body: z.lazy(() => SortOrderSchema).optional(),
  jobAplicationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobApplicationCountOrderByAggregateInputSchema: z.ZodType<Prisma.JobApplicationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  job_title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  job_posting_url: z.lazy(() => SortOrderSchema).optional(),
  cover_letter: z.lazy(() => SortOrderSchema).optional(),
  resume: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  resumeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobApplicationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JobApplicationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  job_title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  job_posting_url: z.lazy(() => SortOrderSchema).optional(),
  cover_letter: z.lazy(() => SortOrderSchema).optional(),
  resume: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  resumeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobApplicationMinOrderByAggregateInputSchema: z.ZodType<Prisma.JobApplicationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  job_title: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  job_posting_url: z.lazy(() => SortOrderSchema).optional(),
  cover_letter: z.lazy(() => SortOrderSchema).optional(),
  resume: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  resumeId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const KeyCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.KeyCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => KeyCreateWithoutUserInputSchema),z.lazy(() => KeyCreateWithoutUserInputSchema).array(),z.lazy(() => KeyUncheckedCreateWithoutUserInputSchema),z.lazy(() => KeyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KeyCreateOrConnectWithoutUserInputSchema),z.lazy(() => KeyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KeyCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => KeyWhereUniqueInputSchema),z.lazy(() => KeyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ProjectCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectCreateWithoutUserInputSchema).array(),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EducationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.EducationCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => EducationCreateWithoutUserInputSchema),z.lazy(() => EducationCreateWithoutUserInputSchema).array(),z.lazy(() => EducationUncheckedCreateWithoutUserInputSchema),z.lazy(() => EducationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EducationCreateOrConnectWithoutUserInputSchema),z.lazy(() => EducationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EducationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EducationWhereUniqueInputSchema),z.lazy(() => EducationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExperienceCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ExperienceCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ExperienceCreateWithoutUserInputSchema),z.lazy(() => ExperienceCreateWithoutUserInputSchema).array(),z.lazy(() => ExperienceUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExperienceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExperienceCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExperienceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExperienceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExperienceWhereUniqueInputSchema),z.lazy(() => ExperienceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ContentCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ContentCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ContentCreateWithoutUserInputSchema),z.lazy(() => ContentCreateWithoutUserInputSchema).array(),z.lazy(() => ContentUncheckedCreateWithoutUserInputSchema),z.lazy(() => ContentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutUserInputSchema),z.lazy(() => ContentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HackathonCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HackathonCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => HackathonCreateWithoutUserInputSchema),z.lazy(() => HackathonCreateWithoutUserInputSchema).array(),z.lazy(() => HackathonUncheckedCreateWithoutUserInputSchema),z.lazy(() => HackathonUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HackathonCreateOrConnectWithoutUserInputSchema),z.lazy(() => HackathonCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HackathonCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HackathonWhereUniqueInputSchema),z.lazy(() => HackathonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InternshipCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.InternshipCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => InternshipCreateWithoutUserInputSchema),z.lazy(() => InternshipCreateWithoutUserInputSchema).array(),z.lazy(() => InternshipUncheckedCreateWithoutUserInputSchema),z.lazy(() => InternshipUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCreateOrConnectWithoutUserInputSchema),z.lazy(() => InternshipCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema),z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ResumeCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ResumeCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ResumeCreateWithoutUserInputSchema),z.lazy(() => ResumeCreateWithoutUserInputSchema).array(),z.lazy(() => ResumeUncheckedCreateWithoutUserInputSchema),z.lazy(() => ResumeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResumeCreateOrConnectWithoutUserInputSchema),z.lazy(() => ResumeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResumeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ResumeWhereUniqueInputSchema),z.lazy(() => ResumeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const JobApplicationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutUserInputSchema),z.lazy(() => JobApplicationCreateWithoutUserInputSchema).array(),z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema),z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema),z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobApplicationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema),z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const KeyUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.KeyUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => KeyCreateWithoutUserInputSchema),z.lazy(() => KeyCreateWithoutUserInputSchema).array(),z.lazy(() => KeyUncheckedCreateWithoutUserInputSchema),z.lazy(() => KeyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KeyCreateOrConnectWithoutUserInputSchema),z.lazy(() => KeyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KeyCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => KeyWhereUniqueInputSchema),z.lazy(() => KeyWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectCreateWithoutUserInputSchema).array(),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const EducationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.EducationUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => EducationCreateWithoutUserInputSchema),z.lazy(() => EducationCreateWithoutUserInputSchema).array(),z.lazy(() => EducationUncheckedCreateWithoutUserInputSchema),z.lazy(() => EducationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EducationCreateOrConnectWithoutUserInputSchema),z.lazy(() => EducationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EducationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => EducationWhereUniqueInputSchema),z.lazy(() => EducationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExperienceUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ExperienceUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ExperienceCreateWithoutUserInputSchema),z.lazy(() => ExperienceCreateWithoutUserInputSchema).array(),z.lazy(() => ExperienceUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExperienceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExperienceCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExperienceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExperienceCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExperienceWhereUniqueInputSchema),z.lazy(() => ExperienceWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ContentUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ContentUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ContentCreateWithoutUserInputSchema),z.lazy(() => ContentCreateWithoutUserInputSchema).array(),z.lazy(() => ContentUncheckedCreateWithoutUserInputSchema),z.lazy(() => ContentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutUserInputSchema),z.lazy(() => ContentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const HackathonUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.HackathonUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => HackathonCreateWithoutUserInputSchema),z.lazy(() => HackathonCreateWithoutUserInputSchema).array(),z.lazy(() => HackathonUncheckedCreateWithoutUserInputSchema),z.lazy(() => HackathonUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HackathonCreateOrConnectWithoutUserInputSchema),z.lazy(() => HackathonCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HackathonCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => HackathonWhereUniqueInputSchema),z.lazy(() => HackathonWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InternshipUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.InternshipUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => InternshipCreateWithoutUserInputSchema),z.lazy(() => InternshipCreateWithoutUserInputSchema).array(),z.lazy(() => InternshipUncheckedCreateWithoutUserInputSchema),z.lazy(() => InternshipUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCreateOrConnectWithoutUserInputSchema),z.lazy(() => InternshipCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema),z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ResumeUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ResumeUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ResumeCreateWithoutUserInputSchema),z.lazy(() => ResumeCreateWithoutUserInputSchema).array(),z.lazy(() => ResumeUncheckedCreateWithoutUserInputSchema),z.lazy(() => ResumeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResumeCreateOrConnectWithoutUserInputSchema),z.lazy(() => ResumeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResumeCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ResumeWhereUniqueInputSchema),z.lazy(() => ResumeWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutUserInputSchema),z.lazy(() => JobApplicationCreateWithoutUserInputSchema).array(),z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema),z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema),z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobApplicationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema),z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const KeyUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.KeyUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => KeyCreateWithoutUserInputSchema),z.lazy(() => KeyCreateWithoutUserInputSchema).array(),z.lazy(() => KeyUncheckedCreateWithoutUserInputSchema),z.lazy(() => KeyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KeyCreateOrConnectWithoutUserInputSchema),z.lazy(() => KeyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => KeyUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => KeyUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KeyCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => KeyWhereUniqueInputSchema),z.lazy(() => KeyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => KeyWhereUniqueInputSchema),z.lazy(() => KeyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => KeyWhereUniqueInputSchema),z.lazy(() => KeyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => KeyWhereUniqueInputSchema),z.lazy(() => KeyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => KeyUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => KeyUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => KeyUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => KeyUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => KeyScalarWhereInputSchema),z.lazy(() => KeyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ProjectUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectCreateWithoutUserInputSchema).array(),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProjectUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProjectUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ProjectUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectScalarWhereInputSchema),z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EducationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.EducationUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EducationCreateWithoutUserInputSchema),z.lazy(() => EducationCreateWithoutUserInputSchema).array(),z.lazy(() => EducationUncheckedCreateWithoutUserInputSchema),z.lazy(() => EducationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EducationCreateOrConnectWithoutUserInputSchema),z.lazy(() => EducationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EducationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => EducationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EducationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EducationWhereUniqueInputSchema),z.lazy(() => EducationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EducationWhereUniqueInputSchema),z.lazy(() => EducationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EducationWhereUniqueInputSchema),z.lazy(() => EducationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EducationWhereUniqueInputSchema),z.lazy(() => EducationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EducationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => EducationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EducationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => EducationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EducationScalarWhereInputSchema),z.lazy(() => EducationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExperienceUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ExperienceUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExperienceCreateWithoutUserInputSchema),z.lazy(() => ExperienceCreateWithoutUserInputSchema).array(),z.lazy(() => ExperienceUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExperienceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExperienceCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExperienceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExperienceUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExperienceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExperienceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExperienceWhereUniqueInputSchema),z.lazy(() => ExperienceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExperienceWhereUniqueInputSchema),z.lazy(() => ExperienceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExperienceWhereUniqueInputSchema),z.lazy(() => ExperienceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExperienceWhereUniqueInputSchema),z.lazy(() => ExperienceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExperienceUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExperienceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExperienceUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ExperienceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExperienceScalarWhereInputSchema),z.lazy(() => ExperienceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ContentUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ContentUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContentCreateWithoutUserInputSchema),z.lazy(() => ContentCreateWithoutUserInputSchema).array(),z.lazy(() => ContentUncheckedCreateWithoutUserInputSchema),z.lazy(() => ContentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutUserInputSchema),z.lazy(() => ContentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ContentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ContentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ContentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContentScalarWhereInputSchema),z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HackathonUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.HackathonUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => HackathonCreateWithoutUserInputSchema),z.lazy(() => HackathonCreateWithoutUserInputSchema).array(),z.lazy(() => HackathonUncheckedCreateWithoutUserInputSchema),z.lazy(() => HackathonUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HackathonCreateOrConnectWithoutUserInputSchema),z.lazy(() => HackathonCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HackathonUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HackathonUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HackathonCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HackathonWhereUniqueInputSchema),z.lazy(() => HackathonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HackathonWhereUniqueInputSchema),z.lazy(() => HackathonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HackathonWhereUniqueInputSchema),z.lazy(() => HackathonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HackathonWhereUniqueInputSchema),z.lazy(() => HackathonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HackathonUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HackathonUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HackathonUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => HackathonUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HackathonScalarWhereInputSchema),z.lazy(() => HackathonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InternshipUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.InternshipUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => InternshipCreateWithoutUserInputSchema),z.lazy(() => InternshipCreateWithoutUserInputSchema).array(),z.lazy(() => InternshipUncheckedCreateWithoutUserInputSchema),z.lazy(() => InternshipUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCreateOrConnectWithoutUserInputSchema),z.lazy(() => InternshipCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InternshipUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InternshipUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema),z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema),z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema),z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema),z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InternshipUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InternshipUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InternshipUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => InternshipUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InternshipScalarWhereInputSchema),z.lazy(() => InternshipScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ResumeUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ResumeUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ResumeCreateWithoutUserInputSchema),z.lazy(() => ResumeCreateWithoutUserInputSchema).array(),z.lazy(() => ResumeUncheckedCreateWithoutUserInputSchema),z.lazy(() => ResumeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResumeCreateOrConnectWithoutUserInputSchema),z.lazy(() => ResumeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ResumeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ResumeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResumeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ResumeWhereUniqueInputSchema),z.lazy(() => ResumeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ResumeWhereUniqueInputSchema),z.lazy(() => ResumeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ResumeWhereUniqueInputSchema),z.lazy(() => ResumeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ResumeWhereUniqueInputSchema),z.lazy(() => ResumeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ResumeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ResumeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ResumeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ResumeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ResumeScalarWhereInputSchema),z.lazy(() => ResumeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JobApplicationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.JobApplicationUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutUserInputSchema),z.lazy(() => JobApplicationCreateWithoutUserInputSchema).array(),z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema),z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema),z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobApplicationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => JobApplicationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobApplicationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema),z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema),z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema),z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema),z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobApplicationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => JobApplicationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobApplicationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => JobApplicationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobApplicationScalarWhereInputSchema),z.lazy(() => JobApplicationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const KeyUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.KeyUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => KeyCreateWithoutUserInputSchema),z.lazy(() => KeyCreateWithoutUserInputSchema).array(),z.lazy(() => KeyUncheckedCreateWithoutUserInputSchema),z.lazy(() => KeyUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => KeyCreateOrConnectWithoutUserInputSchema),z.lazy(() => KeyCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => KeyUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => KeyUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => KeyCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => KeyWhereUniqueInputSchema),z.lazy(() => KeyWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => KeyWhereUniqueInputSchema),z.lazy(() => KeyWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => KeyWhereUniqueInputSchema),z.lazy(() => KeyWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => KeyWhereUniqueInputSchema),z.lazy(() => KeyWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => KeyUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => KeyUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => KeyUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => KeyUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => KeyScalarWhereInputSchema),z.lazy(() => KeyScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectCreateWithoutUserInputSchema).array(),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema),z.lazy(() => ProjectCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ProjectUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProjectUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ProjectCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ProjectWhereUniqueInputSchema),z.lazy(() => ProjectWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ProjectUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ProjectUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ProjectUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ProjectScalarWhereInputSchema),z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const EducationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.EducationUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => EducationCreateWithoutUserInputSchema),z.lazy(() => EducationCreateWithoutUserInputSchema).array(),z.lazy(() => EducationUncheckedCreateWithoutUserInputSchema),z.lazy(() => EducationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => EducationCreateOrConnectWithoutUserInputSchema),z.lazy(() => EducationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => EducationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => EducationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => EducationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => EducationWhereUniqueInputSchema),z.lazy(() => EducationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => EducationWhereUniqueInputSchema),z.lazy(() => EducationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => EducationWhereUniqueInputSchema),z.lazy(() => EducationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => EducationWhereUniqueInputSchema),z.lazy(() => EducationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => EducationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => EducationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => EducationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => EducationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => EducationScalarWhereInputSchema),z.lazy(() => EducationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExperienceUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ExperienceUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExperienceCreateWithoutUserInputSchema),z.lazy(() => ExperienceCreateWithoutUserInputSchema).array(),z.lazy(() => ExperienceUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExperienceUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExperienceCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExperienceCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExperienceUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExperienceUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExperienceCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExperienceWhereUniqueInputSchema),z.lazy(() => ExperienceWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExperienceWhereUniqueInputSchema),z.lazy(() => ExperienceWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExperienceWhereUniqueInputSchema),z.lazy(() => ExperienceWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExperienceWhereUniqueInputSchema),z.lazy(() => ExperienceWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExperienceUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExperienceUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExperienceUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ExperienceUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExperienceScalarWhereInputSchema),z.lazy(() => ExperienceScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ContentUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ContentCreateWithoutUserInputSchema),z.lazy(() => ContentCreateWithoutUserInputSchema).array(),z.lazy(() => ContentUncheckedCreateWithoutUserInputSchema),z.lazy(() => ContentUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ContentCreateOrConnectWithoutUserInputSchema),z.lazy(() => ContentCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ContentUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ContentUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ContentCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ContentWhereUniqueInputSchema),z.lazy(() => ContentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ContentUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ContentUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ContentUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ContentUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ContentScalarWhereInputSchema),z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const HackathonUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.HackathonUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => HackathonCreateWithoutUserInputSchema),z.lazy(() => HackathonCreateWithoutUserInputSchema).array(),z.lazy(() => HackathonUncheckedCreateWithoutUserInputSchema),z.lazy(() => HackathonUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => HackathonCreateOrConnectWithoutUserInputSchema),z.lazy(() => HackathonCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => HackathonUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HackathonUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => HackathonCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => HackathonWhereUniqueInputSchema),z.lazy(() => HackathonWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => HackathonWhereUniqueInputSchema),z.lazy(() => HackathonWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => HackathonWhereUniqueInputSchema),z.lazy(() => HackathonWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => HackathonWhereUniqueInputSchema),z.lazy(() => HackathonWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => HackathonUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => HackathonUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => HackathonUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => HackathonUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => HackathonScalarWhereInputSchema),z.lazy(() => HackathonScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InternshipUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.InternshipUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => InternshipCreateWithoutUserInputSchema),z.lazy(() => InternshipCreateWithoutUserInputSchema).array(),z.lazy(() => InternshipUncheckedCreateWithoutUserInputSchema),z.lazy(() => InternshipUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InternshipCreateOrConnectWithoutUserInputSchema),z.lazy(() => InternshipCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InternshipUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InternshipUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InternshipCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema),z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema),z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema),z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InternshipWhereUniqueInputSchema),z.lazy(() => InternshipWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InternshipUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InternshipUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InternshipUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => InternshipUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InternshipScalarWhereInputSchema),z.lazy(() => InternshipScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ResumeUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ResumeUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ResumeCreateWithoutUserInputSchema),z.lazy(() => ResumeCreateWithoutUserInputSchema).array(),z.lazy(() => ResumeUncheckedCreateWithoutUserInputSchema),z.lazy(() => ResumeUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ResumeCreateOrConnectWithoutUserInputSchema),z.lazy(() => ResumeCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ResumeUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ResumeUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ResumeCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ResumeWhereUniqueInputSchema),z.lazy(() => ResumeWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ResumeWhereUniqueInputSchema),z.lazy(() => ResumeWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ResumeWhereUniqueInputSchema),z.lazy(() => ResumeWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ResumeWhereUniqueInputSchema),z.lazy(() => ResumeWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ResumeUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ResumeUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ResumeUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ResumeUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ResumeScalarWhereInputSchema),z.lazy(() => ResumeScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutUserInputSchema),z.lazy(() => JobApplicationCreateWithoutUserInputSchema).array(),z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema),z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema),z.lazy(() => JobApplicationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobApplicationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => JobApplicationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobApplicationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema),z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema),z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema),z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobApplicationWhereUniqueInputSchema),z.lazy(() => JobApplicationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobApplicationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => JobApplicationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobApplicationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => JobApplicationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobApplicationScalarWhereInputSchema),z.lazy(() => JobApplicationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAuth_sessionInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAuth_sessionInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAuth_sessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuth_sessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuth_sessionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const BigIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BigIntFieldUpdateOperationsInput> = z.object({
  set: z.bigint().optional(),
  increment: z.bigint().optional(),
  decrement: z.bigint().optional(),
  multiply: z.bigint().optional(),
  divide: z.bigint().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAuth_sessionNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAuth_sessionNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAuth_sessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuth_sessionInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAuth_sessionInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAuth_sessionInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAuth_sessionInputSchema),z.lazy(() => UserUpdateWithoutAuth_sessionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuth_sessionInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutKeyInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutKeyInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutKeyInputSchema),z.lazy(() => UserUncheckedCreateWithoutKeyInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutKeyInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutKeyNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutKeyNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutKeyInputSchema),z.lazy(() => UserUncheckedCreateWithoutKeyInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutKeyInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutKeyInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutKeyInputSchema),z.lazy(() => UserUpdateWithoutKeyInputSchema),z.lazy(() => UserUncheckedUpdateWithoutKeyInputSchema) ]).optional(),
}).strict();

export const ProjectCreatelanguagesInputSchema: z.ZodType<Prisma.ProjectCreatelanguagesInput> = z.object({
  set: z.string().array()
}).strict();

export const ProjectCreatelibrariesInputSchema: z.ZodType<Prisma.ProjectCreatelibrariesInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateNestedOneWithoutProjectInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProjectInputSchema),z.lazy(() => UserUncheckedCreateWithoutProjectInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProjectInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ProjectUpdatelanguagesInputSchema: z.ZodType<Prisma.ProjectUpdatelanguagesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const ProjectUpdatelibrariesInputSchema: z.ZodType<Prisma.ProjectUpdatelibrariesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutProjectNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutProjectInputSchema),z.lazy(() => UserUncheckedCreateWithoutProjectInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProjectInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutProjectInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutProjectInputSchema),z.lazy(() => UserUpdateWithoutProjectInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProjectInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutEducationInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutEducationInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEducationInputSchema),z.lazy(() => UserUncheckedCreateWithoutEducationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEducationInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumQualificationFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumQualificationFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => QualificationSchema).optional()
}).strict();

export const UserUpdateOneWithoutEducationNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutEducationNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutEducationInputSchema),z.lazy(() => UserUncheckedCreateWithoutEducationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutEducationInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutEducationInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutEducationInputSchema),z.lazy(() => UserUpdateWithoutEducationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEducationInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutExperienceInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutExperienceInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutExperienceInputSchema),z.lazy(() => UserUncheckedCreateWithoutExperienceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExperienceInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneWithoutExperienceNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutExperienceNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutExperienceInputSchema),z.lazy(() => UserUncheckedCreateWithoutExperienceInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExperienceInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutExperienceInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutExperienceInputSchema),z.lazy(() => UserUpdateWithoutExperienceInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExperienceInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutContentInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutContentInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutContentInputSchema),z.lazy(() => UserUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutContentInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumContentTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumContentTypeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => ContentTypeSchema).optional()
}).strict();

export const UserUpdateOneWithoutContentNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutContentNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutContentInputSchema),z.lazy(() => UserUncheckedCreateWithoutContentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutContentInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutContentInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutContentInputSchema),z.lazy(() => UserUpdateWithoutContentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutContentInputSchema) ]).optional(),
}).strict();

export const HackathonCreatetechnologiesInputSchema: z.ZodType<Prisma.HackathonCreatetechnologiesInput> = z.object({
  set: z.string().array()
}).strict();

export const UserCreateNestedOneWithoutHackathonInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutHackathonInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHackathonInputSchema),z.lazy(() => UserUncheckedCreateWithoutHackathonInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHackathonInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const HackathonUpdatetechnologiesInputSchema: z.ZodType<Prisma.HackathonUpdatetechnologiesInput> = z.object({
  set: z.string().array().optional(),
  push: z.union([ z.string(),z.string().array() ]).optional(),
}).strict();

export const UserUpdateOneWithoutHackathonNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutHackathonNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHackathonInputSchema),z.lazy(() => UserUncheckedCreateWithoutHackathonInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHackathonInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutHackathonInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutHackathonInputSchema),z.lazy(() => UserUpdateWithoutHackathonInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHackathonInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutInternshipInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInternshipInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInternshipInputSchema),z.lazy(() => UserUncheckedCreateWithoutInternshipInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInternshipInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneWithoutInternshipNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutInternshipNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInternshipInputSchema),z.lazy(() => UserUncheckedCreateWithoutInternshipInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInternshipInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInternshipInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInternshipInputSchema),z.lazy(() => UserUpdateWithoutInternshipInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInternshipInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutResumeInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutResumeInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutResumeInputSchema),z.lazy(() => UserUncheckedCreateWithoutResumeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutResumeInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneWithoutResumeNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutResumeNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutResumeInputSchema),z.lazy(() => UserUncheckedCreateWithoutResumeInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutResumeInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutResumeInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutResumeInputSchema),z.lazy(() => UserUpdateWithoutResumeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutResumeInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutJobApplicationInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutJobApplicationInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutJobApplicationInputSchema),z.lazy(() => UserUncheckedCreateWithoutJobApplicationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutJobApplicationInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneWithoutJobApplicationNestedInputSchema: z.ZodType<Prisma.UserUpdateOneWithoutJobApplicationNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutJobApplicationInputSchema),z.lazy(() => UserUncheckedCreateWithoutJobApplicationInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutJobApplicationInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutJobApplicationInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => UserWhereInputSchema) ]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutJobApplicationInputSchema),z.lazy(() => UserUpdateWithoutJobApplicationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutJobApplicationInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBigIntFilterSchema: z.ZodType<Prisma.NestedBigIntFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntFilterSchema) ]).optional(),
}).strict();

export const NestedBigIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBigIntWithAggregatesFilter> = z.object({
  equals: z.bigint().optional(),
  in: z.bigint().array().optional(),
  notIn: z.bigint().array().optional(),
  lt: z.bigint().optional(),
  lte: z.bigint().optional(),
  gt: z.bigint().optional(),
  gte: z.bigint().optional(),
  not: z.union([ z.bigint(),z.lazy(() => NestedBigIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBigIntFilterSchema).optional(),
  _max: z.lazy(() => NestedBigIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumQualificationFilterSchema: z.ZodType<Prisma.NestedEnumQualificationFilter> = z.object({
  equals: z.lazy(() => QualificationSchema).optional(),
  in: z.lazy(() => QualificationSchema).array().optional(),
  notIn: z.lazy(() => QualificationSchema).array().optional(),
  not: z.union([ z.lazy(() => QualificationSchema),z.lazy(() => NestedEnumQualificationFilterSchema) ]).optional(),
}).strict();

export const NestedEnumQualificationWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumQualificationWithAggregatesFilter> = z.object({
  equals: z.lazy(() => QualificationSchema).optional(),
  in: z.lazy(() => QualificationSchema).array().optional(),
  notIn: z.lazy(() => QualificationSchema).array().optional(),
  not: z.union([ z.lazy(() => QualificationSchema),z.lazy(() => NestedEnumQualificationWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumQualificationFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumQualificationFilterSchema).optional()
}).strict();

export const NestedEnumContentTypeFilterSchema: z.ZodType<Prisma.NestedEnumContentTypeFilter> = z.object({
  equals: z.lazy(() => ContentTypeSchema).optional(),
  in: z.lazy(() => ContentTypeSchema).array().optional(),
  notIn: z.lazy(() => ContentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ContentTypeSchema),z.lazy(() => NestedEnumContentTypeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumContentTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumContentTypeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => ContentTypeSchema).optional(),
  in: z.lazy(() => ContentTypeSchema).array().optional(),
  notIn: z.lazy(() => ContentTypeSchema).array().optional(),
  not: z.union([ z.lazy(() => ContentTypeSchema),z.lazy(() => NestedEnumContentTypeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumContentTypeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumContentTypeFilterSchema).optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string(),
  active_expires: z.bigint(),
  idle_expires: z.bigint()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  active_expires: z.bigint(),
  idle_expires: z.bigint()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const KeyCreateWithoutUserInputSchema: z.ZodType<Prisma.KeyCreateWithoutUserInput> = z.object({
  id: z.string(),
  hashed_password: z.string().optional().nullable()
}).strict();

export const KeyUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.KeyUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  hashed_password: z.string().optional().nullable()
}).strict();

export const KeyCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.KeyCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => KeyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => KeyCreateWithoutUserInputSchema),z.lazy(() => KeyUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const KeyCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.KeyCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => KeyCreateManyUserInputSchema),z.lazy(() => KeyCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProjectCreateWithoutUserInputSchema: z.ZodType<Prisma.ProjectCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  repoUrl: z.string(),
  image_url: z.string().optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectCreatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectCreatelibrariesInputSchema),z.string().array() ]).optional(),
}).strict();

export const ProjectUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  repoUrl: z.string(),
  image_url: z.string().optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectCreatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectCreatelibrariesInputSchema),z.string().array() ]).optional(),
}).strict();

export const ProjectCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ProjectCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ProjectCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ProjectCreateManyUserInputSchema),z.lazy(() => ProjectCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const EducationCreateWithoutUserInputSchema: z.ZodType<Prisma.EducationCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  school: z.string(),
  qualification: z.lazy(() => QualificationSchema),
  field: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date()
}).strict();

export const EducationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.EducationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  school: z.string(),
  qualification: z.lazy(() => QualificationSchema),
  field: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date()
}).strict();

export const EducationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.EducationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => EducationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => EducationCreateWithoutUserInputSchema),z.lazy(() => EducationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const EducationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.EducationCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => EducationCreateManyUserInputSchema),z.lazy(() => EducationCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ExperienceCreateWithoutUserInputSchema: z.ZodType<Prisma.ExperienceCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  position: z.string(),
  company: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  description: z.string().optional().nullable()
}).strict();

export const ExperienceUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ExperienceUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  position: z.string(),
  company: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  description: z.string().optional().nullable()
}).strict();

export const ExperienceCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ExperienceCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ExperienceWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExperienceCreateWithoutUserInputSchema),z.lazy(() => ExperienceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ExperienceCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ExperienceCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ExperienceCreateManyUserInputSchema),z.lazy(() => ExperienceCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ContentCreateWithoutUserInputSchema: z.ZodType<Prisma.ContentCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  type: z.lazy(() => ContentTypeSchema),
  content_url: z.string()
}).strict();

export const ContentUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ContentUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  type: z.lazy(() => ContentTypeSchema),
  content_url: z.string()
}).strict();

export const ContentCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ContentCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ContentCreateWithoutUserInputSchema),z.lazy(() => ContentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ContentCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ContentCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ContentCreateManyUserInputSchema),z.lazy(() => ContentCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const HackathonCreateWithoutUserInputSchema: z.ZodType<Prisma.HackathonCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  technologies: z.union([ z.lazy(() => HackathonCreatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  link: z.string()
}).strict();

export const HackathonUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.HackathonUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  technologies: z.union([ z.lazy(() => HackathonCreatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  link: z.string()
}).strict();

export const HackathonCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.HackathonCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => HackathonWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => HackathonCreateWithoutUserInputSchema),z.lazy(() => HackathonUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const HackathonCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.HackathonCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => HackathonCreateManyUserInputSchema),z.lazy(() => HackathonCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const InternshipCreateWithoutUserInputSchema: z.ZodType<Prisma.InternshipCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  description: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  role: z.string(),
  company: z.string()
}).strict();

export const InternshipUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.InternshipUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  description: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  role: z.string(),
  company: z.string()
}).strict();

export const InternshipCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.InternshipCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => InternshipWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InternshipCreateWithoutUserInputSchema),z.lazy(() => InternshipUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const InternshipCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.InternshipCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InternshipCreateManyUserInputSchema),z.lazy(() => InternshipCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ResumeCreateWithoutUserInputSchema: z.ZodType<Prisma.ResumeCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  body: z.string(),
  jobAplicationId: z.string().optional().nullable()
}).strict();

export const ResumeUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ResumeUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  body: z.string(),
  jobAplicationId: z.string().optional().nullable()
}).strict();

export const ResumeCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ResumeCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ResumeWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ResumeCreateWithoutUserInputSchema),z.lazy(() => ResumeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ResumeCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ResumeCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ResumeCreateManyUserInputSchema),z.lazy(() => ResumeCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const JobApplicationCreateWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  job_title: z.string(),
  description: z.string(),
  job_posting_url: z.string(),
  cover_letter: z.string(),
  resume: z.string(),
  resumeId: z.string().optional().nullable()
}).strict();

export const JobApplicationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  job_title: z.string(),
  description: z.string(),
  job_posting_url: z.string(),
  cover_letter: z.string(),
  resume: z.string(),
  resumeId: z.string().optional().nullable()
}).strict();

export const JobApplicationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => JobApplicationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutUserInputSchema),z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const JobApplicationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.JobApplicationCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => JobApplicationCreateManyUserInputSchema),z.lazy(() => JobApplicationCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  active_expires: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
  idle_expires: z.union([ z.lazy(() => BigIntFilterSchema),z.bigint() ]).optional(),
}).strict();

export const KeyUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.KeyUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => KeyWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => KeyUpdateWithoutUserInputSchema),z.lazy(() => KeyUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => KeyCreateWithoutUserInputSchema),z.lazy(() => KeyUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const KeyUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.KeyUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => KeyWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => KeyUpdateWithoutUserInputSchema),z.lazy(() => KeyUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const KeyUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.KeyUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => KeyScalarWhereInputSchema),
  data: z.union([ z.lazy(() => KeyUpdateManyMutationInputSchema),z.lazy(() => KeyUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const KeyScalarWhereInputSchema: z.ZodType<Prisma.KeyScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => KeyScalarWhereInputSchema),z.lazy(() => KeyScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => KeyScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => KeyScalarWhereInputSchema),z.lazy(() => KeyScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hashed_password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ProjectUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ProjectUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ProjectUpdateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ProjectUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ProjectUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ProjectUpdateWithoutUserInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ProjectUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ProjectUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ProjectScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ProjectUpdateManyMutationInputSchema),z.lazy(() => ProjectUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ProjectScalarWhereInputSchema: z.ZodType<Prisma.ProjectScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectScalarWhereInputSchema),z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectScalarWhereInputSchema),z.lazy(() => ProjectScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  repoUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  image_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  languages: z.lazy(() => StringNullableListFilterSchema).optional(),
  libraries: z.lazy(() => StringNullableListFilterSchema).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const EducationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.EducationUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => EducationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => EducationUpdateWithoutUserInputSchema),z.lazy(() => EducationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => EducationCreateWithoutUserInputSchema),z.lazy(() => EducationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const EducationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.EducationUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => EducationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => EducationUpdateWithoutUserInputSchema),z.lazy(() => EducationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const EducationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.EducationUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => EducationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => EducationUpdateManyMutationInputSchema),z.lazy(() => EducationUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const EducationScalarWhereInputSchema: z.ZodType<Prisma.EducationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => EducationScalarWhereInputSchema),z.lazy(() => EducationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => EducationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => EducationScalarWhereInputSchema),z.lazy(() => EducationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  school: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  qualification: z.union([ z.lazy(() => EnumQualificationFilterSchema),z.lazy(() => QualificationSchema) ]).optional(),
  field: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ExperienceUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ExperienceUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ExperienceWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExperienceUpdateWithoutUserInputSchema),z.lazy(() => ExperienceUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ExperienceCreateWithoutUserInputSchema),z.lazy(() => ExperienceUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ExperienceUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ExperienceUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ExperienceWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExperienceUpdateWithoutUserInputSchema),z.lazy(() => ExperienceUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ExperienceUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ExperienceUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ExperienceScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExperienceUpdateManyMutationInputSchema),z.lazy(() => ExperienceUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ExperienceScalarWhereInputSchema: z.ZodType<Prisma.ExperienceScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExperienceScalarWhereInputSchema),z.lazy(() => ExperienceScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExperienceScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExperienceScalarWhereInputSchema),z.lazy(() => ExperienceScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  position: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ContentUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ContentUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ContentUpdateWithoutUserInputSchema),z.lazy(() => ContentUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ContentCreateWithoutUserInputSchema),z.lazy(() => ContentUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ContentUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ContentUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ContentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ContentUpdateWithoutUserInputSchema),z.lazy(() => ContentUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ContentUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ContentUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ContentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ContentUpdateManyMutationInputSchema),z.lazy(() => ContentUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ContentScalarWhereInputSchema: z.ZodType<Prisma.ContentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ContentScalarWhereInputSchema),z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ContentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ContentScalarWhereInputSchema),z.lazy(() => ContentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => EnumContentTypeFilterSchema),z.lazy(() => ContentTypeSchema) ]).optional(),
  content_url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const HackathonUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.HackathonUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => HackathonWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => HackathonUpdateWithoutUserInputSchema),z.lazy(() => HackathonUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => HackathonCreateWithoutUserInputSchema),z.lazy(() => HackathonUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const HackathonUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.HackathonUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => HackathonWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => HackathonUpdateWithoutUserInputSchema),z.lazy(() => HackathonUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const HackathonUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.HackathonUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => HackathonScalarWhereInputSchema),
  data: z.union([ z.lazy(() => HackathonUpdateManyMutationInputSchema),z.lazy(() => HackathonUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const HackathonScalarWhereInputSchema: z.ZodType<Prisma.HackathonScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => HackathonScalarWhereInputSchema),z.lazy(() => HackathonScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => HackathonScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => HackathonScalarWhereInputSchema),z.lazy(() => HackathonScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  technologies: z.lazy(() => StringNullableListFilterSchema).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  link: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const InternshipUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.InternshipUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => InternshipWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InternshipUpdateWithoutUserInputSchema),z.lazy(() => InternshipUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => InternshipCreateWithoutUserInputSchema),z.lazy(() => InternshipUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const InternshipUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.InternshipUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => InternshipWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InternshipUpdateWithoutUserInputSchema),z.lazy(() => InternshipUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const InternshipUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.InternshipUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => InternshipScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InternshipUpdateManyMutationInputSchema),z.lazy(() => InternshipUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const InternshipScalarWhereInputSchema: z.ZodType<Prisma.InternshipScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InternshipScalarWhereInputSchema),z.lazy(() => InternshipScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InternshipScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InternshipScalarWhereInputSchema),z.lazy(() => InternshipScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  from: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  to: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ResumeUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ResumeUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ResumeWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ResumeUpdateWithoutUserInputSchema),z.lazy(() => ResumeUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ResumeCreateWithoutUserInputSchema),z.lazy(() => ResumeUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ResumeUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ResumeUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ResumeWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ResumeUpdateWithoutUserInputSchema),z.lazy(() => ResumeUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ResumeUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ResumeUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ResumeScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ResumeUpdateManyMutationInputSchema),z.lazy(() => ResumeUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const ResumeScalarWhereInputSchema: z.ZodType<Prisma.ResumeScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ResumeScalarWhereInputSchema),z.lazy(() => ResumeScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ResumeScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ResumeScalarWhereInputSchema),z.lazy(() => ResumeScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  body: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobAplicationId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const JobApplicationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => JobApplicationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JobApplicationUpdateWithoutUserInputSchema),z.lazy(() => JobApplicationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => JobApplicationCreateWithoutUserInputSchema),z.lazy(() => JobApplicationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const JobApplicationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => JobApplicationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JobApplicationUpdateWithoutUserInputSchema),z.lazy(() => JobApplicationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const JobApplicationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => JobApplicationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JobApplicationUpdateManyMutationInputSchema),z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const JobApplicationScalarWhereInputSchema: z.ZodType<Prisma.JobApplicationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobApplicationScalarWhereInputSchema),z.lazy(() => JobApplicationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobApplicationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobApplicationScalarWhereInputSchema),z.lazy(() => JobApplicationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  job_title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  job_posting_url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  cover_letter: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  resume: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  resumeId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserCreateWithoutAuth_sessionInputSchema: z.ZodType<Prisma.UserCreateWithoutAuth_sessionInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  key: z.lazy(() => KeyCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAuth_sessionInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAuth_sessionInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  key: z.lazy(() => KeyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAuth_sessionInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAuth_sessionInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAuth_sessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuth_sessionInputSchema) ]),
}).strict();

export const UserUpsertWithoutAuth_sessionInputSchema: z.ZodType<Prisma.UserUpsertWithoutAuth_sessionInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAuth_sessionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuth_sessionInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAuth_sessionInputSchema),z.lazy(() => UserUncheckedCreateWithoutAuth_sessionInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAuth_sessionInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAuth_sessionInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAuth_sessionInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAuth_sessionInputSchema) ]),
}).strict();

export const UserUpdateWithoutAuth_sessionInputSchema: z.ZodType<Prisma.UserUpdateWithoutAuth_sessionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.lazy(() => KeyUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAuth_sessionInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAuth_sessionInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  key: z.lazy(() => KeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutKeyInputSchema: z.ZodType<Prisma.UserCreateWithoutKeyInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutKeyInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutKeyInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutKeyInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutKeyInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutKeyInputSchema),z.lazy(() => UserUncheckedCreateWithoutKeyInputSchema) ]),
}).strict();

export const UserUpsertWithoutKeyInputSchema: z.ZodType<Prisma.UserUpsertWithoutKeyInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutKeyInputSchema),z.lazy(() => UserUncheckedUpdateWithoutKeyInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutKeyInputSchema),z.lazy(() => UserUncheckedCreateWithoutKeyInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutKeyInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutKeyInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutKeyInputSchema),z.lazy(() => UserUncheckedUpdateWithoutKeyInputSchema) ]),
}).strict();

export const UserUpdateWithoutKeyInputSchema: z.ZodType<Prisma.UserUpdateWithoutKeyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutKeyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutKeyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutProjectInputSchema: z.ZodType<Prisma.UserCreateWithoutProjectInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutProjectInputSchema),z.lazy(() => UserUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const UserUpsertWithoutProjectInputSchema: z.ZodType<Prisma.UserUpsertWithoutProjectInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutProjectInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutProjectInputSchema),z.lazy(() => UserUncheckedCreateWithoutProjectInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutProjectInputSchema),z.lazy(() => UserUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const UserUpdateWithoutProjectInputSchema: z.ZodType<Prisma.UserUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutEducationInputSchema: z.ZodType<Prisma.UserCreateWithoutEducationInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutEducationInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutEducationInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutEducationInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutEducationInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutEducationInputSchema),z.lazy(() => UserUncheckedCreateWithoutEducationInputSchema) ]),
}).strict();

export const UserUpsertWithoutEducationInputSchema: z.ZodType<Prisma.UserUpsertWithoutEducationInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutEducationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEducationInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutEducationInputSchema),z.lazy(() => UserUncheckedCreateWithoutEducationInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutEducationInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutEducationInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutEducationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutEducationInputSchema) ]),
}).strict();

export const UserUpdateWithoutEducationInputSchema: z.ZodType<Prisma.UserUpdateWithoutEducationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutEducationInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutEducationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutExperienceInputSchema: z.ZodType<Prisma.UserCreateWithoutExperienceInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutExperienceInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutExperienceInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutExperienceInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutExperienceInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutExperienceInputSchema),z.lazy(() => UserUncheckedCreateWithoutExperienceInputSchema) ]),
}).strict();

export const UserUpsertWithoutExperienceInputSchema: z.ZodType<Prisma.UserUpsertWithoutExperienceInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutExperienceInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExperienceInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutExperienceInputSchema),z.lazy(() => UserUncheckedCreateWithoutExperienceInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutExperienceInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutExperienceInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutExperienceInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExperienceInputSchema) ]),
}).strict();

export const UserUpdateWithoutExperienceInputSchema: z.ZodType<Prisma.UserUpdateWithoutExperienceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutExperienceInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutExperienceInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutContentInputSchema: z.ZodType<Prisma.UserCreateWithoutContentInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutContentInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutContentInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutContentInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutContentInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutContentInputSchema),z.lazy(() => UserUncheckedCreateWithoutContentInputSchema) ]),
}).strict();

export const UserUpsertWithoutContentInputSchema: z.ZodType<Prisma.UserUpsertWithoutContentInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutContentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutContentInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutContentInputSchema),z.lazy(() => UserUncheckedCreateWithoutContentInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutContentInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutContentInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutContentInputSchema),z.lazy(() => UserUncheckedUpdateWithoutContentInputSchema) ]),
}).strict();

export const UserUpdateWithoutContentInputSchema: z.ZodType<Prisma.UserUpdateWithoutContentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutContentInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutContentInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutHackathonInputSchema: z.ZodType<Prisma.UserCreateWithoutHackathonInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutHackathonInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutHackathonInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutHackathonInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutHackathonInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutHackathonInputSchema),z.lazy(() => UserUncheckedCreateWithoutHackathonInputSchema) ]),
}).strict();

export const UserUpsertWithoutHackathonInputSchema: z.ZodType<Prisma.UserUpsertWithoutHackathonInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutHackathonInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHackathonInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutHackathonInputSchema),z.lazy(() => UserUncheckedCreateWithoutHackathonInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutHackathonInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutHackathonInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutHackathonInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHackathonInputSchema) ]),
}).strict();

export const UserUpdateWithoutHackathonInputSchema: z.ZodType<Prisma.UserUpdateWithoutHackathonInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutHackathonInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutHackathonInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutInternshipInputSchema: z.ZodType<Prisma.UserCreateWithoutInternshipInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutInternshipInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInternshipInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutInternshipInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInternshipInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInternshipInputSchema),z.lazy(() => UserUncheckedCreateWithoutInternshipInputSchema) ]),
}).strict();

export const UserUpsertWithoutInternshipInputSchema: z.ZodType<Prisma.UserUpsertWithoutInternshipInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutInternshipInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInternshipInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInternshipInputSchema),z.lazy(() => UserUncheckedCreateWithoutInternshipInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutInternshipInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInternshipInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInternshipInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInternshipInputSchema) ]),
}).strict();

export const UserUpdateWithoutInternshipInputSchema: z.ZodType<Prisma.UserUpdateWithoutInternshipInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutInternshipInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInternshipInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutResumeInputSchema: z.ZodType<Prisma.UserCreateWithoutResumeInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutResumeInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutResumeInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutResumeInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutResumeInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutResumeInputSchema),z.lazy(() => UserUncheckedCreateWithoutResumeInputSchema) ]),
}).strict();

export const UserUpsertWithoutResumeInputSchema: z.ZodType<Prisma.UserUpsertWithoutResumeInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutResumeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutResumeInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutResumeInputSchema),z.lazy(() => UserUncheckedCreateWithoutResumeInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutResumeInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutResumeInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutResumeInputSchema),z.lazy(() => UserUncheckedUpdateWithoutResumeInputSchema) ]),
}).strict();

export const UserUpdateWithoutResumeInputSchema: z.ZodType<Prisma.UserUpdateWithoutResumeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutResumeInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutResumeInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  JobApplication: z.lazy(() => JobApplicationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutJobApplicationInputSchema: z.ZodType<Prisma.UserCreateWithoutJobApplicationInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutJobApplicationInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutJobApplicationInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  username: z.string(),
  email: z.string(),
  avatar: z.string().optional().nullable(),
  name: z.string().optional().nullable(),
  about_me: z.string().optional().nullable(),
  github_username: z.string().optional().nullable(),
  linkedin_username: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  skills: z.string().optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutJobApplicationInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutJobApplicationInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutJobApplicationInputSchema),z.lazy(() => UserUncheckedCreateWithoutJobApplicationInputSchema) ]),
}).strict();

export const UserUpsertWithoutJobApplicationInputSchema: z.ZodType<Prisma.UserUpsertWithoutJobApplicationInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutJobApplicationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutJobApplicationInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutJobApplicationInputSchema),z.lazy(() => UserUncheckedCreateWithoutJobApplicationInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutJobApplicationInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutJobApplicationInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutJobApplicationInputSchema),z.lazy(() => UserUncheckedUpdateWithoutJobApplicationInputSchema) ]),
}).strict();

export const UserUpdateWithoutJobApplicationInputSchema: z.ZodType<Prisma.UserUpdateWithoutJobApplicationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutJobApplicationInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutJobApplicationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  about_me: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  github_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  linkedin_username: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  country: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  skills: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  auth_session: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  key: z.lazy(() => KeyUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Project: z.lazy(() => ProjectUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Education: z.lazy(() => EducationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Experience: z.lazy(() => ExperienceUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Content: z.lazy(() => ContentUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Hackathon: z.lazy(() => HackathonUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Internship: z.lazy(() => InternshipUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  Resume: z.lazy(() => ResumeUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string(),
  active_expires: z.bigint(),
  idle_expires: z.bigint()
}).strict();

export const KeyCreateManyUserInputSchema: z.ZodType<Prisma.KeyCreateManyUserInput> = z.object({
  id: z.string(),
  hashed_password: z.string().optional().nullable()
}).strict();

export const ProjectCreateManyUserInputSchema: z.ZodType<Prisma.ProjectCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  repoUrl: z.string(),
  image_url: z.string().optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectCreatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectCreatelibrariesInputSchema),z.string().array() ]).optional(),
}).strict();

export const EducationCreateManyUserInputSchema: z.ZodType<Prisma.EducationCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  school: z.string(),
  qualification: z.lazy(() => QualificationSchema),
  field: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date()
}).strict();

export const ExperienceCreateManyUserInputSchema: z.ZodType<Prisma.ExperienceCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  position: z.string(),
  company: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  description: z.string().optional().nullable()
}).strict();

export const ContentCreateManyUserInputSchema: z.ZodType<Prisma.ContentCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  title: z.string(),
  type: z.lazy(() => ContentTypeSchema),
  content_url: z.string()
}).strict();

export const HackathonCreateManyUserInputSchema: z.ZodType<Prisma.HackathonCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  name: z.string(),
  description: z.string(),
  technologies: z.union([ z.lazy(() => HackathonCreatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  link: z.string()
}).strict();

export const InternshipCreateManyUserInputSchema: z.ZodType<Prisma.InternshipCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  description: z.string(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  role: z.string(),
  company: z.string()
}).strict();

export const ResumeCreateManyUserInputSchema: z.ZodType<Prisma.ResumeCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  body: z.string(),
  jobAplicationId: z.string().optional().nullable()
}).strict();

export const JobApplicationCreateManyUserInputSchema: z.ZodType<Prisma.JobApplicationCreateManyUserInput> = z.object({
  id: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  job_title: z.string(),
  description: z.string(),
  job_posting_url: z.string(),
  cover_letter: z.string(),
  resume: z.string(),
  resumeId: z.string().optional().nullable()
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  idle_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  idle_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  active_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
  idle_expires: z.union([ z.bigint(),z.lazy(() => BigIntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const KeyUpdateWithoutUserInputSchema: z.ZodType<Prisma.KeyUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashed_password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const KeyUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.KeyUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashed_password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const KeyUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.KeyUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hashed_password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ProjectUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectUpdatelibrariesInputSchema),z.string().array() ]).optional(),
}).strict();

export const ProjectUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectUpdatelibrariesInputSchema),z.string().array() ]).optional(),
}).strict();

export const ProjectUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  repoUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  languages: z.union([ z.lazy(() => ProjectUpdatelanguagesInputSchema),z.string().array() ]).optional(),
  libraries: z.union([ z.lazy(() => ProjectUpdatelibrariesInputSchema),z.string().array() ]).optional(),
}).strict();

export const EducationUpdateWithoutUserInputSchema: z.ZodType<Prisma.EducationUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  qualification: z.union([ z.lazy(() => QualificationSchema),z.lazy(() => EnumQualificationFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EducationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.EducationUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  qualification: z.union([ z.lazy(() => QualificationSchema),z.lazy(() => EnumQualificationFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const EducationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.EducationUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  school: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  qualification: z.union([ z.lazy(() => QualificationSchema),z.lazy(() => EnumQualificationFieldUpdateOperationsInputSchema) ]).optional(),
  field: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExperienceUpdateWithoutUserInputSchema: z.ZodType<Prisma.ExperienceUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ExperienceUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ExperienceUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ExperienceUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ExperienceUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ContentUpdateWithoutUserInputSchema: z.ZodType<Prisma.ContentUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContentTypeSchema),z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContentUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContentTypeSchema),z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ContentUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ContentUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.lazy(() => ContentTypeSchema),z.lazy(() => EnumContentTypeFieldUpdateOperationsInputSchema) ]).optional(),
  content_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HackathonUpdateWithoutUserInputSchema: z.ZodType<Prisma.HackathonUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  technologies: z.union([ z.lazy(() => HackathonUpdatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HackathonUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.HackathonUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  technologies: z.union([ z.lazy(() => HackathonUpdatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const HackathonUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.HackathonUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  technologies: z.union([ z.lazy(() => HackathonUpdatetechnologiesInputSchema),z.string().array() ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  link: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InternshipUpdateWithoutUserInputSchema: z.ZodType<Prisma.InternshipUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InternshipUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.InternshipUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InternshipUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.InternshipUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  from: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  to: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ResumeUpdateWithoutUserInputSchema: z.ZodType<Prisma.ResumeUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobAplicationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ResumeUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ResumeUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobAplicationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ResumeUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.ResumeUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  body: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobAplicationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const JobApplicationUpdateWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  job_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job_posting_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cover_letter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const JobApplicationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  job_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job_posting_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cover_letter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const JobApplicationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.JobApplicationUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().uuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  job_title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  job_posting_url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cover_letter: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resume: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  resumeId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const KeyFindFirstArgsSchema: z.ZodType<Prisma.KeyFindFirstArgs> = z.object({
  select: KeySelectSchema.optional(),
  include: KeyIncludeSchema.optional(),
  where: KeyWhereInputSchema.optional(),
  orderBy: z.union([ KeyOrderByWithRelationInputSchema.array(),KeyOrderByWithRelationInputSchema ]).optional(),
  cursor: KeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ KeyScalarFieldEnumSchema,KeyScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const KeyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.KeyFindFirstOrThrowArgs> = z.object({
  select: KeySelectSchema.optional(),
  include: KeyIncludeSchema.optional(),
  where: KeyWhereInputSchema.optional(),
  orderBy: z.union([ KeyOrderByWithRelationInputSchema.array(),KeyOrderByWithRelationInputSchema ]).optional(),
  cursor: KeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ KeyScalarFieldEnumSchema,KeyScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const KeyFindManyArgsSchema: z.ZodType<Prisma.KeyFindManyArgs> = z.object({
  select: KeySelectSchema.optional(),
  include: KeyIncludeSchema.optional(),
  where: KeyWhereInputSchema.optional(),
  orderBy: z.union([ KeyOrderByWithRelationInputSchema.array(),KeyOrderByWithRelationInputSchema ]).optional(),
  cursor: KeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ KeyScalarFieldEnumSchema,KeyScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const KeyAggregateArgsSchema: z.ZodType<Prisma.KeyAggregateArgs> = z.object({
  where: KeyWhereInputSchema.optional(),
  orderBy: z.union([ KeyOrderByWithRelationInputSchema.array(),KeyOrderByWithRelationInputSchema ]).optional(),
  cursor: KeyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const KeyGroupByArgsSchema: z.ZodType<Prisma.KeyGroupByArgs> = z.object({
  where: KeyWhereInputSchema.optional(),
  orderBy: z.union([ KeyOrderByWithAggregationInputSchema.array(),KeyOrderByWithAggregationInputSchema ]).optional(),
  by: KeyScalarFieldEnumSchema.array(),
  having: KeyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const KeyFindUniqueArgsSchema: z.ZodType<Prisma.KeyFindUniqueArgs> = z.object({
  select: KeySelectSchema.optional(),
  include: KeyIncludeSchema.optional(),
  where: KeyWhereUniqueInputSchema,
}).strict()

export const KeyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.KeyFindUniqueOrThrowArgs> = z.object({
  select: KeySelectSchema.optional(),
  include: KeyIncludeSchema.optional(),
  where: KeyWhereUniqueInputSchema,
}).strict()

export const ProjectFindFirstArgsSchema: z.ZodType<Prisma.ProjectFindFirstArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindFirstOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProjectFindManyArgsSchema: z.ZodType<Prisma.ProjectFindManyArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ProjectScalarFieldEnumSchema,ProjectScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ProjectAggregateArgsSchema: z.ZodType<Prisma.ProjectAggregateArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProjectGroupByArgsSchema: z.ZodType<Prisma.ProjectGroupByArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithAggregationInputSchema.array(),ProjectOrderByWithAggregationInputSchema ]).optional(),
  by: ProjectScalarFieldEnumSchema.array(),
  having: ProjectScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProjectFindUniqueArgsSchema: z.ZodType<Prisma.ProjectFindUniqueArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict()

export const ProjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindUniqueOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict()

export const EducationFindFirstArgsSchema: z.ZodType<Prisma.EducationFindFirstArgs> = z.object({
  select: EducationSelectSchema.optional(),
  include: EducationIncludeSchema.optional(),
  where: EducationWhereInputSchema.optional(),
  orderBy: z.union([ EducationOrderByWithRelationInputSchema.array(),EducationOrderByWithRelationInputSchema ]).optional(),
  cursor: EducationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EducationScalarFieldEnumSchema,EducationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const EducationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.EducationFindFirstOrThrowArgs> = z.object({
  select: EducationSelectSchema.optional(),
  include: EducationIncludeSchema.optional(),
  where: EducationWhereInputSchema.optional(),
  orderBy: z.union([ EducationOrderByWithRelationInputSchema.array(),EducationOrderByWithRelationInputSchema ]).optional(),
  cursor: EducationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EducationScalarFieldEnumSchema,EducationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const EducationFindManyArgsSchema: z.ZodType<Prisma.EducationFindManyArgs> = z.object({
  select: EducationSelectSchema.optional(),
  include: EducationIncludeSchema.optional(),
  where: EducationWhereInputSchema.optional(),
  orderBy: z.union([ EducationOrderByWithRelationInputSchema.array(),EducationOrderByWithRelationInputSchema ]).optional(),
  cursor: EducationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ EducationScalarFieldEnumSchema,EducationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const EducationAggregateArgsSchema: z.ZodType<Prisma.EducationAggregateArgs> = z.object({
  where: EducationWhereInputSchema.optional(),
  orderBy: z.union([ EducationOrderByWithRelationInputSchema.array(),EducationOrderByWithRelationInputSchema ]).optional(),
  cursor: EducationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const EducationGroupByArgsSchema: z.ZodType<Prisma.EducationGroupByArgs> = z.object({
  where: EducationWhereInputSchema.optional(),
  orderBy: z.union([ EducationOrderByWithAggregationInputSchema.array(),EducationOrderByWithAggregationInputSchema ]).optional(),
  by: EducationScalarFieldEnumSchema.array(),
  having: EducationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const EducationFindUniqueArgsSchema: z.ZodType<Prisma.EducationFindUniqueArgs> = z.object({
  select: EducationSelectSchema.optional(),
  include: EducationIncludeSchema.optional(),
  where: EducationWhereUniqueInputSchema,
}).strict()

export const EducationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.EducationFindUniqueOrThrowArgs> = z.object({
  select: EducationSelectSchema.optional(),
  include: EducationIncludeSchema.optional(),
  where: EducationWhereUniqueInputSchema,
}).strict()

export const ExperienceFindFirstArgsSchema: z.ZodType<Prisma.ExperienceFindFirstArgs> = z.object({
  select: ExperienceSelectSchema.optional(),
  include: ExperienceIncludeSchema.optional(),
  where: ExperienceWhereInputSchema.optional(),
  orderBy: z.union([ ExperienceOrderByWithRelationInputSchema.array(),ExperienceOrderByWithRelationInputSchema ]).optional(),
  cursor: ExperienceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExperienceScalarFieldEnumSchema,ExperienceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ExperienceFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExperienceFindFirstOrThrowArgs> = z.object({
  select: ExperienceSelectSchema.optional(),
  include: ExperienceIncludeSchema.optional(),
  where: ExperienceWhereInputSchema.optional(),
  orderBy: z.union([ ExperienceOrderByWithRelationInputSchema.array(),ExperienceOrderByWithRelationInputSchema ]).optional(),
  cursor: ExperienceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExperienceScalarFieldEnumSchema,ExperienceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ExperienceFindManyArgsSchema: z.ZodType<Prisma.ExperienceFindManyArgs> = z.object({
  select: ExperienceSelectSchema.optional(),
  include: ExperienceIncludeSchema.optional(),
  where: ExperienceWhereInputSchema.optional(),
  orderBy: z.union([ ExperienceOrderByWithRelationInputSchema.array(),ExperienceOrderByWithRelationInputSchema ]).optional(),
  cursor: ExperienceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ExperienceScalarFieldEnumSchema,ExperienceScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ExperienceAggregateArgsSchema: z.ZodType<Prisma.ExperienceAggregateArgs> = z.object({
  where: ExperienceWhereInputSchema.optional(),
  orderBy: z.union([ ExperienceOrderByWithRelationInputSchema.array(),ExperienceOrderByWithRelationInputSchema ]).optional(),
  cursor: ExperienceWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ExperienceGroupByArgsSchema: z.ZodType<Prisma.ExperienceGroupByArgs> = z.object({
  where: ExperienceWhereInputSchema.optional(),
  orderBy: z.union([ ExperienceOrderByWithAggregationInputSchema.array(),ExperienceOrderByWithAggregationInputSchema ]).optional(),
  by: ExperienceScalarFieldEnumSchema.array(),
  having: ExperienceScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ExperienceFindUniqueArgsSchema: z.ZodType<Prisma.ExperienceFindUniqueArgs> = z.object({
  select: ExperienceSelectSchema.optional(),
  include: ExperienceIncludeSchema.optional(),
  where: ExperienceWhereUniqueInputSchema,
}).strict()

export const ExperienceFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExperienceFindUniqueOrThrowArgs> = z.object({
  select: ExperienceSelectSchema.optional(),
  include: ExperienceIncludeSchema.optional(),
  where: ExperienceWhereUniqueInputSchema,
}).strict()

export const ContentFindFirstArgsSchema: z.ZodType<Prisma.ContentFindFirstArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereInputSchema.optional(),
  orderBy: z.union([ ContentOrderByWithRelationInputSchema.array(),ContentOrderByWithRelationInputSchema ]).optional(),
  cursor: ContentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContentScalarFieldEnumSchema,ContentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ContentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ContentFindFirstOrThrowArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereInputSchema.optional(),
  orderBy: z.union([ ContentOrderByWithRelationInputSchema.array(),ContentOrderByWithRelationInputSchema ]).optional(),
  cursor: ContentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContentScalarFieldEnumSchema,ContentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ContentFindManyArgsSchema: z.ZodType<Prisma.ContentFindManyArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereInputSchema.optional(),
  orderBy: z.union([ ContentOrderByWithRelationInputSchema.array(),ContentOrderByWithRelationInputSchema ]).optional(),
  cursor: ContentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ContentScalarFieldEnumSchema,ContentScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ContentAggregateArgsSchema: z.ZodType<Prisma.ContentAggregateArgs> = z.object({
  where: ContentWhereInputSchema.optional(),
  orderBy: z.union([ ContentOrderByWithRelationInputSchema.array(),ContentOrderByWithRelationInputSchema ]).optional(),
  cursor: ContentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ContentGroupByArgsSchema: z.ZodType<Prisma.ContentGroupByArgs> = z.object({
  where: ContentWhereInputSchema.optional(),
  orderBy: z.union([ ContentOrderByWithAggregationInputSchema.array(),ContentOrderByWithAggregationInputSchema ]).optional(),
  by: ContentScalarFieldEnumSchema.array(),
  having: ContentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ContentFindUniqueArgsSchema: z.ZodType<Prisma.ContentFindUniqueArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereUniqueInputSchema,
}).strict()

export const ContentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ContentFindUniqueOrThrowArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereUniqueInputSchema,
}).strict()

export const HackathonFindFirstArgsSchema: z.ZodType<Prisma.HackathonFindFirstArgs> = z.object({
  select: HackathonSelectSchema.optional(),
  include: HackathonIncludeSchema.optional(),
  where: HackathonWhereInputSchema.optional(),
  orderBy: z.union([ HackathonOrderByWithRelationInputSchema.array(),HackathonOrderByWithRelationInputSchema ]).optional(),
  cursor: HackathonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HackathonScalarFieldEnumSchema,HackathonScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const HackathonFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HackathonFindFirstOrThrowArgs> = z.object({
  select: HackathonSelectSchema.optional(),
  include: HackathonIncludeSchema.optional(),
  where: HackathonWhereInputSchema.optional(),
  orderBy: z.union([ HackathonOrderByWithRelationInputSchema.array(),HackathonOrderByWithRelationInputSchema ]).optional(),
  cursor: HackathonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HackathonScalarFieldEnumSchema,HackathonScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const HackathonFindManyArgsSchema: z.ZodType<Prisma.HackathonFindManyArgs> = z.object({
  select: HackathonSelectSchema.optional(),
  include: HackathonIncludeSchema.optional(),
  where: HackathonWhereInputSchema.optional(),
  orderBy: z.union([ HackathonOrderByWithRelationInputSchema.array(),HackathonOrderByWithRelationInputSchema ]).optional(),
  cursor: HackathonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ HackathonScalarFieldEnumSchema,HackathonScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const HackathonAggregateArgsSchema: z.ZodType<Prisma.HackathonAggregateArgs> = z.object({
  where: HackathonWhereInputSchema.optional(),
  orderBy: z.union([ HackathonOrderByWithRelationInputSchema.array(),HackathonOrderByWithRelationInputSchema ]).optional(),
  cursor: HackathonWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HackathonGroupByArgsSchema: z.ZodType<Prisma.HackathonGroupByArgs> = z.object({
  where: HackathonWhereInputSchema.optional(),
  orderBy: z.union([ HackathonOrderByWithAggregationInputSchema.array(),HackathonOrderByWithAggregationInputSchema ]).optional(),
  by: HackathonScalarFieldEnumSchema.array(),
  having: HackathonScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const HackathonFindUniqueArgsSchema: z.ZodType<Prisma.HackathonFindUniqueArgs> = z.object({
  select: HackathonSelectSchema.optional(),
  include: HackathonIncludeSchema.optional(),
  where: HackathonWhereUniqueInputSchema,
}).strict()

export const HackathonFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HackathonFindUniqueOrThrowArgs> = z.object({
  select: HackathonSelectSchema.optional(),
  include: HackathonIncludeSchema.optional(),
  where: HackathonWhereUniqueInputSchema,
}).strict()

export const InternshipFindFirstArgsSchema: z.ZodType<Prisma.InternshipFindFirstArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereInputSchema.optional(),
  orderBy: z.union([ InternshipOrderByWithRelationInputSchema.array(),InternshipOrderByWithRelationInputSchema ]).optional(),
  cursor: InternshipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InternshipScalarFieldEnumSchema,InternshipScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const InternshipFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InternshipFindFirstOrThrowArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereInputSchema.optional(),
  orderBy: z.union([ InternshipOrderByWithRelationInputSchema.array(),InternshipOrderByWithRelationInputSchema ]).optional(),
  cursor: InternshipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InternshipScalarFieldEnumSchema,InternshipScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const InternshipFindManyArgsSchema: z.ZodType<Prisma.InternshipFindManyArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereInputSchema.optional(),
  orderBy: z.union([ InternshipOrderByWithRelationInputSchema.array(),InternshipOrderByWithRelationInputSchema ]).optional(),
  cursor: InternshipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InternshipScalarFieldEnumSchema,InternshipScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const InternshipAggregateArgsSchema: z.ZodType<Prisma.InternshipAggregateArgs> = z.object({
  where: InternshipWhereInputSchema.optional(),
  orderBy: z.union([ InternshipOrderByWithRelationInputSchema.array(),InternshipOrderByWithRelationInputSchema ]).optional(),
  cursor: InternshipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const InternshipGroupByArgsSchema: z.ZodType<Prisma.InternshipGroupByArgs> = z.object({
  where: InternshipWhereInputSchema.optional(),
  orderBy: z.union([ InternshipOrderByWithAggregationInputSchema.array(),InternshipOrderByWithAggregationInputSchema ]).optional(),
  by: InternshipScalarFieldEnumSchema.array(),
  having: InternshipScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const InternshipFindUniqueArgsSchema: z.ZodType<Prisma.InternshipFindUniqueArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereUniqueInputSchema,
}).strict()

export const InternshipFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InternshipFindUniqueOrThrowArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereUniqueInputSchema,
}).strict()

export const ResumeFindFirstArgsSchema: z.ZodType<Prisma.ResumeFindFirstArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereInputSchema.optional(),
  orderBy: z.union([ ResumeOrderByWithRelationInputSchema.array(),ResumeOrderByWithRelationInputSchema ]).optional(),
  cursor: ResumeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResumeScalarFieldEnumSchema,ResumeScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ResumeFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ResumeFindFirstOrThrowArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereInputSchema.optional(),
  orderBy: z.union([ ResumeOrderByWithRelationInputSchema.array(),ResumeOrderByWithRelationInputSchema ]).optional(),
  cursor: ResumeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResumeScalarFieldEnumSchema,ResumeScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ResumeFindManyArgsSchema: z.ZodType<Prisma.ResumeFindManyArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereInputSchema.optional(),
  orderBy: z.union([ ResumeOrderByWithRelationInputSchema.array(),ResumeOrderByWithRelationInputSchema ]).optional(),
  cursor: ResumeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ResumeScalarFieldEnumSchema,ResumeScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const ResumeAggregateArgsSchema: z.ZodType<Prisma.ResumeAggregateArgs> = z.object({
  where: ResumeWhereInputSchema.optional(),
  orderBy: z.union([ ResumeOrderByWithRelationInputSchema.array(),ResumeOrderByWithRelationInputSchema ]).optional(),
  cursor: ResumeWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ResumeGroupByArgsSchema: z.ZodType<Prisma.ResumeGroupByArgs> = z.object({
  where: ResumeWhereInputSchema.optional(),
  orderBy: z.union([ ResumeOrderByWithAggregationInputSchema.array(),ResumeOrderByWithAggregationInputSchema ]).optional(),
  by: ResumeScalarFieldEnumSchema.array(),
  having: ResumeScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ResumeFindUniqueArgsSchema: z.ZodType<Prisma.ResumeFindUniqueArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereUniqueInputSchema,
}).strict()

export const ResumeFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ResumeFindUniqueOrThrowArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereUniqueInputSchema,
}).strict()

export const JobApplicationFindFirstArgsSchema: z.ZodType<Prisma.JobApplicationFindFirstArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereInputSchema.optional(),
  orderBy: z.union([ JobApplicationOrderByWithRelationInputSchema.array(),JobApplicationOrderByWithRelationInputSchema ]).optional(),
  cursor: JobApplicationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobApplicationScalarFieldEnumSchema,JobApplicationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const JobApplicationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JobApplicationFindFirstOrThrowArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereInputSchema.optional(),
  orderBy: z.union([ JobApplicationOrderByWithRelationInputSchema.array(),JobApplicationOrderByWithRelationInputSchema ]).optional(),
  cursor: JobApplicationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobApplicationScalarFieldEnumSchema,JobApplicationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const JobApplicationFindManyArgsSchema: z.ZodType<Prisma.JobApplicationFindManyArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereInputSchema.optional(),
  orderBy: z.union([ JobApplicationOrderByWithRelationInputSchema.array(),JobApplicationOrderByWithRelationInputSchema ]).optional(),
  cursor: JobApplicationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ JobApplicationScalarFieldEnumSchema,JobApplicationScalarFieldEnumSchema.array() ]).optional(),
}).strict()

export const JobApplicationAggregateArgsSchema: z.ZodType<Prisma.JobApplicationAggregateArgs> = z.object({
  where: JobApplicationWhereInputSchema.optional(),
  orderBy: z.union([ JobApplicationOrderByWithRelationInputSchema.array(),JobApplicationOrderByWithRelationInputSchema ]).optional(),
  cursor: JobApplicationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const JobApplicationGroupByArgsSchema: z.ZodType<Prisma.JobApplicationGroupByArgs> = z.object({
  where: JobApplicationWhereInputSchema.optional(),
  orderBy: z.union([ JobApplicationOrderByWithAggregationInputSchema.array(),JobApplicationOrderByWithAggregationInputSchema ]).optional(),
  by: JobApplicationScalarFieldEnumSchema.array(),
  having: JobApplicationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const JobApplicationFindUniqueArgsSchema: z.ZodType<Prisma.JobApplicationFindUniqueArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereUniqueInputSchema,
}).strict()

export const JobApplicationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JobApplicationFindUniqueOrThrowArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereUniqueInputSchema,
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict()

export const KeyCreateArgsSchema: z.ZodType<Prisma.KeyCreateArgs> = z.object({
  select: KeySelectSchema.optional(),
  include: KeyIncludeSchema.optional(),
  data: z.union([ KeyCreateInputSchema,KeyUncheckedCreateInputSchema ]),
}).strict()

export const KeyUpsertArgsSchema: z.ZodType<Prisma.KeyUpsertArgs> = z.object({
  select: KeySelectSchema.optional(),
  include: KeyIncludeSchema.optional(),
  where: KeyWhereUniqueInputSchema,
  create: z.union([ KeyCreateInputSchema,KeyUncheckedCreateInputSchema ]),
  update: z.union([ KeyUpdateInputSchema,KeyUncheckedUpdateInputSchema ]),
}).strict()

export const KeyCreateManyArgsSchema: z.ZodType<Prisma.KeyCreateManyArgs> = z.object({
  data: z.union([ KeyCreateManyInputSchema,KeyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const KeyDeleteArgsSchema: z.ZodType<Prisma.KeyDeleteArgs> = z.object({
  select: KeySelectSchema.optional(),
  include: KeyIncludeSchema.optional(),
  where: KeyWhereUniqueInputSchema,
}).strict()

export const KeyUpdateArgsSchema: z.ZodType<Prisma.KeyUpdateArgs> = z.object({
  select: KeySelectSchema.optional(),
  include: KeyIncludeSchema.optional(),
  data: z.union([ KeyUpdateInputSchema,KeyUncheckedUpdateInputSchema ]),
  where: KeyWhereUniqueInputSchema,
}).strict()

export const KeyUpdateManyArgsSchema: z.ZodType<Prisma.KeyUpdateManyArgs> = z.object({
  data: z.union([ KeyUpdateManyMutationInputSchema,KeyUncheckedUpdateManyInputSchema ]),
  where: KeyWhereInputSchema.optional(),
}).strict()

export const KeyDeleteManyArgsSchema: z.ZodType<Prisma.KeyDeleteManyArgs> = z.object({
  where: KeyWhereInputSchema.optional(),
}).strict()

export const ProjectCreateArgsSchema: z.ZodType<Prisma.ProjectCreateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
}).strict()

export const ProjectUpsertArgsSchema: z.ZodType<Prisma.ProjectUpsertArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
  create: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
  update: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
}).strict()

export const ProjectCreateManyArgsSchema: z.ZodType<Prisma.ProjectCreateManyArgs> = z.object({
  data: z.union([ ProjectCreateManyInputSchema,ProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ProjectDeleteArgsSchema: z.ZodType<Prisma.ProjectDeleteArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict()

export const ProjectUpdateArgsSchema: z.ZodType<Prisma.ProjectUpdateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
  where: ProjectWhereUniqueInputSchema,
}).strict()

export const ProjectUpdateManyArgsSchema: z.ZodType<Prisma.ProjectUpdateManyArgs> = z.object({
  data: z.union([ ProjectUpdateManyMutationInputSchema,ProjectUncheckedUpdateManyInputSchema ]),
  where: ProjectWhereInputSchema.optional(),
}).strict()

export const ProjectDeleteManyArgsSchema: z.ZodType<Prisma.ProjectDeleteManyArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
}).strict()

export const EducationCreateArgsSchema: z.ZodType<Prisma.EducationCreateArgs> = z.object({
  select: EducationSelectSchema.optional(),
  include: EducationIncludeSchema.optional(),
  data: z.union([ EducationCreateInputSchema,EducationUncheckedCreateInputSchema ]),
}).strict()

export const EducationUpsertArgsSchema: z.ZodType<Prisma.EducationUpsertArgs> = z.object({
  select: EducationSelectSchema.optional(),
  include: EducationIncludeSchema.optional(),
  where: EducationWhereUniqueInputSchema,
  create: z.union([ EducationCreateInputSchema,EducationUncheckedCreateInputSchema ]),
  update: z.union([ EducationUpdateInputSchema,EducationUncheckedUpdateInputSchema ]),
}).strict()

export const EducationCreateManyArgsSchema: z.ZodType<Prisma.EducationCreateManyArgs> = z.object({
  data: z.union([ EducationCreateManyInputSchema,EducationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const EducationDeleteArgsSchema: z.ZodType<Prisma.EducationDeleteArgs> = z.object({
  select: EducationSelectSchema.optional(),
  include: EducationIncludeSchema.optional(),
  where: EducationWhereUniqueInputSchema,
}).strict()

export const EducationUpdateArgsSchema: z.ZodType<Prisma.EducationUpdateArgs> = z.object({
  select: EducationSelectSchema.optional(),
  include: EducationIncludeSchema.optional(),
  data: z.union([ EducationUpdateInputSchema,EducationUncheckedUpdateInputSchema ]),
  where: EducationWhereUniqueInputSchema,
}).strict()

export const EducationUpdateManyArgsSchema: z.ZodType<Prisma.EducationUpdateManyArgs> = z.object({
  data: z.union([ EducationUpdateManyMutationInputSchema,EducationUncheckedUpdateManyInputSchema ]),
  where: EducationWhereInputSchema.optional(),
}).strict()

export const EducationDeleteManyArgsSchema: z.ZodType<Prisma.EducationDeleteManyArgs> = z.object({
  where: EducationWhereInputSchema.optional(),
}).strict()

export const ExperienceCreateArgsSchema: z.ZodType<Prisma.ExperienceCreateArgs> = z.object({
  select: ExperienceSelectSchema.optional(),
  include: ExperienceIncludeSchema.optional(),
  data: z.union([ ExperienceCreateInputSchema,ExperienceUncheckedCreateInputSchema ]),
}).strict()

export const ExperienceUpsertArgsSchema: z.ZodType<Prisma.ExperienceUpsertArgs> = z.object({
  select: ExperienceSelectSchema.optional(),
  include: ExperienceIncludeSchema.optional(),
  where: ExperienceWhereUniqueInputSchema,
  create: z.union([ ExperienceCreateInputSchema,ExperienceUncheckedCreateInputSchema ]),
  update: z.union([ ExperienceUpdateInputSchema,ExperienceUncheckedUpdateInputSchema ]),
}).strict()

export const ExperienceCreateManyArgsSchema: z.ZodType<Prisma.ExperienceCreateManyArgs> = z.object({
  data: z.union([ ExperienceCreateManyInputSchema,ExperienceCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ExperienceDeleteArgsSchema: z.ZodType<Prisma.ExperienceDeleteArgs> = z.object({
  select: ExperienceSelectSchema.optional(),
  include: ExperienceIncludeSchema.optional(),
  where: ExperienceWhereUniqueInputSchema,
}).strict()

export const ExperienceUpdateArgsSchema: z.ZodType<Prisma.ExperienceUpdateArgs> = z.object({
  select: ExperienceSelectSchema.optional(),
  include: ExperienceIncludeSchema.optional(),
  data: z.union([ ExperienceUpdateInputSchema,ExperienceUncheckedUpdateInputSchema ]),
  where: ExperienceWhereUniqueInputSchema,
}).strict()

export const ExperienceUpdateManyArgsSchema: z.ZodType<Prisma.ExperienceUpdateManyArgs> = z.object({
  data: z.union([ ExperienceUpdateManyMutationInputSchema,ExperienceUncheckedUpdateManyInputSchema ]),
  where: ExperienceWhereInputSchema.optional(),
}).strict()

export const ExperienceDeleteManyArgsSchema: z.ZodType<Prisma.ExperienceDeleteManyArgs> = z.object({
  where: ExperienceWhereInputSchema.optional(),
}).strict()

export const ContentCreateArgsSchema: z.ZodType<Prisma.ContentCreateArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  data: z.union([ ContentCreateInputSchema,ContentUncheckedCreateInputSchema ]),
}).strict()

export const ContentUpsertArgsSchema: z.ZodType<Prisma.ContentUpsertArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereUniqueInputSchema,
  create: z.union([ ContentCreateInputSchema,ContentUncheckedCreateInputSchema ]),
  update: z.union([ ContentUpdateInputSchema,ContentUncheckedUpdateInputSchema ]),
}).strict()

export const ContentCreateManyArgsSchema: z.ZodType<Prisma.ContentCreateManyArgs> = z.object({
  data: z.union([ ContentCreateManyInputSchema,ContentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ContentDeleteArgsSchema: z.ZodType<Prisma.ContentDeleteArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  where: ContentWhereUniqueInputSchema,
}).strict()

export const ContentUpdateArgsSchema: z.ZodType<Prisma.ContentUpdateArgs> = z.object({
  select: ContentSelectSchema.optional(),
  include: ContentIncludeSchema.optional(),
  data: z.union([ ContentUpdateInputSchema,ContentUncheckedUpdateInputSchema ]),
  where: ContentWhereUniqueInputSchema,
}).strict()

export const ContentUpdateManyArgsSchema: z.ZodType<Prisma.ContentUpdateManyArgs> = z.object({
  data: z.union([ ContentUpdateManyMutationInputSchema,ContentUncheckedUpdateManyInputSchema ]),
  where: ContentWhereInputSchema.optional(),
}).strict()

export const ContentDeleteManyArgsSchema: z.ZodType<Prisma.ContentDeleteManyArgs> = z.object({
  where: ContentWhereInputSchema.optional(),
}).strict()

export const HackathonCreateArgsSchema: z.ZodType<Prisma.HackathonCreateArgs> = z.object({
  select: HackathonSelectSchema.optional(),
  include: HackathonIncludeSchema.optional(),
  data: z.union([ HackathonCreateInputSchema,HackathonUncheckedCreateInputSchema ]),
}).strict()

export const HackathonUpsertArgsSchema: z.ZodType<Prisma.HackathonUpsertArgs> = z.object({
  select: HackathonSelectSchema.optional(),
  include: HackathonIncludeSchema.optional(),
  where: HackathonWhereUniqueInputSchema,
  create: z.union([ HackathonCreateInputSchema,HackathonUncheckedCreateInputSchema ]),
  update: z.union([ HackathonUpdateInputSchema,HackathonUncheckedUpdateInputSchema ]),
}).strict()

export const HackathonCreateManyArgsSchema: z.ZodType<Prisma.HackathonCreateManyArgs> = z.object({
  data: z.union([ HackathonCreateManyInputSchema,HackathonCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const HackathonDeleteArgsSchema: z.ZodType<Prisma.HackathonDeleteArgs> = z.object({
  select: HackathonSelectSchema.optional(),
  include: HackathonIncludeSchema.optional(),
  where: HackathonWhereUniqueInputSchema,
}).strict()

export const HackathonUpdateArgsSchema: z.ZodType<Prisma.HackathonUpdateArgs> = z.object({
  select: HackathonSelectSchema.optional(),
  include: HackathonIncludeSchema.optional(),
  data: z.union([ HackathonUpdateInputSchema,HackathonUncheckedUpdateInputSchema ]),
  where: HackathonWhereUniqueInputSchema,
}).strict()

export const HackathonUpdateManyArgsSchema: z.ZodType<Prisma.HackathonUpdateManyArgs> = z.object({
  data: z.union([ HackathonUpdateManyMutationInputSchema,HackathonUncheckedUpdateManyInputSchema ]),
  where: HackathonWhereInputSchema.optional(),
}).strict()

export const HackathonDeleteManyArgsSchema: z.ZodType<Prisma.HackathonDeleteManyArgs> = z.object({
  where: HackathonWhereInputSchema.optional(),
}).strict()

export const InternshipCreateArgsSchema: z.ZodType<Prisma.InternshipCreateArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  data: z.union([ InternshipCreateInputSchema,InternshipUncheckedCreateInputSchema ]),
}).strict()

export const InternshipUpsertArgsSchema: z.ZodType<Prisma.InternshipUpsertArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereUniqueInputSchema,
  create: z.union([ InternshipCreateInputSchema,InternshipUncheckedCreateInputSchema ]),
  update: z.union([ InternshipUpdateInputSchema,InternshipUncheckedUpdateInputSchema ]),
}).strict()

export const InternshipCreateManyArgsSchema: z.ZodType<Prisma.InternshipCreateManyArgs> = z.object({
  data: z.union([ InternshipCreateManyInputSchema,InternshipCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const InternshipDeleteArgsSchema: z.ZodType<Prisma.InternshipDeleteArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  where: InternshipWhereUniqueInputSchema,
}).strict()

export const InternshipUpdateArgsSchema: z.ZodType<Prisma.InternshipUpdateArgs> = z.object({
  select: InternshipSelectSchema.optional(),
  include: InternshipIncludeSchema.optional(),
  data: z.union([ InternshipUpdateInputSchema,InternshipUncheckedUpdateInputSchema ]),
  where: InternshipWhereUniqueInputSchema,
}).strict()

export const InternshipUpdateManyArgsSchema: z.ZodType<Prisma.InternshipUpdateManyArgs> = z.object({
  data: z.union([ InternshipUpdateManyMutationInputSchema,InternshipUncheckedUpdateManyInputSchema ]),
  where: InternshipWhereInputSchema.optional(),
}).strict()

export const InternshipDeleteManyArgsSchema: z.ZodType<Prisma.InternshipDeleteManyArgs> = z.object({
  where: InternshipWhereInputSchema.optional(),
}).strict()

export const ResumeCreateArgsSchema: z.ZodType<Prisma.ResumeCreateArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  data: z.union([ ResumeCreateInputSchema,ResumeUncheckedCreateInputSchema ]),
}).strict()

export const ResumeUpsertArgsSchema: z.ZodType<Prisma.ResumeUpsertArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereUniqueInputSchema,
  create: z.union([ ResumeCreateInputSchema,ResumeUncheckedCreateInputSchema ]),
  update: z.union([ ResumeUpdateInputSchema,ResumeUncheckedUpdateInputSchema ]),
}).strict()

export const ResumeCreateManyArgsSchema: z.ZodType<Prisma.ResumeCreateManyArgs> = z.object({
  data: z.union([ ResumeCreateManyInputSchema,ResumeCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ResumeDeleteArgsSchema: z.ZodType<Prisma.ResumeDeleteArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  where: ResumeWhereUniqueInputSchema,
}).strict()

export const ResumeUpdateArgsSchema: z.ZodType<Prisma.ResumeUpdateArgs> = z.object({
  select: ResumeSelectSchema.optional(),
  include: ResumeIncludeSchema.optional(),
  data: z.union([ ResumeUpdateInputSchema,ResumeUncheckedUpdateInputSchema ]),
  where: ResumeWhereUniqueInputSchema,
}).strict()

export const ResumeUpdateManyArgsSchema: z.ZodType<Prisma.ResumeUpdateManyArgs> = z.object({
  data: z.union([ ResumeUpdateManyMutationInputSchema,ResumeUncheckedUpdateManyInputSchema ]),
  where: ResumeWhereInputSchema.optional(),
}).strict()

export const ResumeDeleteManyArgsSchema: z.ZodType<Prisma.ResumeDeleteManyArgs> = z.object({
  where: ResumeWhereInputSchema.optional(),
}).strict()

export const JobApplicationCreateArgsSchema: z.ZodType<Prisma.JobApplicationCreateArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  data: z.union([ JobApplicationCreateInputSchema,JobApplicationUncheckedCreateInputSchema ]),
}).strict()

export const JobApplicationUpsertArgsSchema: z.ZodType<Prisma.JobApplicationUpsertArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereUniqueInputSchema,
  create: z.union([ JobApplicationCreateInputSchema,JobApplicationUncheckedCreateInputSchema ]),
  update: z.union([ JobApplicationUpdateInputSchema,JobApplicationUncheckedUpdateInputSchema ]),
}).strict()

export const JobApplicationCreateManyArgsSchema: z.ZodType<Prisma.JobApplicationCreateManyArgs> = z.object({
  data: z.union([ JobApplicationCreateManyInputSchema,JobApplicationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const JobApplicationDeleteArgsSchema: z.ZodType<Prisma.JobApplicationDeleteArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  where: JobApplicationWhereUniqueInputSchema,
}).strict()

export const JobApplicationUpdateArgsSchema: z.ZodType<Prisma.JobApplicationUpdateArgs> = z.object({
  select: JobApplicationSelectSchema.optional(),
  include: JobApplicationIncludeSchema.optional(),
  data: z.union([ JobApplicationUpdateInputSchema,JobApplicationUncheckedUpdateInputSchema ]),
  where: JobApplicationWhereUniqueInputSchema,
}).strict()

export const JobApplicationUpdateManyArgsSchema: z.ZodType<Prisma.JobApplicationUpdateManyArgs> = z.object({
  data: z.union([ JobApplicationUpdateManyMutationInputSchema,JobApplicationUncheckedUpdateManyInputSchema ]),
  where: JobApplicationWhereInputSchema.optional(),
}).strict()

export const JobApplicationDeleteManyArgsSchema: z.ZodType<Prisma.JobApplicationDeleteManyArgs> = z.object({
  where: JobApplicationWhereInputSchema.optional(),
}).strict()