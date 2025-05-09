import { eventsSchema } from "@/zod";
import { JSONContent } from "novel";
import { z } from "zod";

export interface EditorProps {
  initialContent?: JSONContent;
  setInitialContent: React.Dispatch<React.SetStateAction<JSONContent>>;
}

export type FormHeaderProps = {
  label: string;
  split?: string;
  className?: string;
};

export type FormLabelProps = {
  htmlFor: string;
  label: string;
  className?: string;
  error?: string;
};

export type HotEventsData = {
  eventName: string;
  description: string;
  department: string;
  imgUrl: string;
  visitLink: string;
};

export interface EventsDataType extends HotEventsData {
  registerLink: string;
}

export enum FormType {
  NONE = "NONE",
  INTERNAL = "INTERNAL",
  EXTERNAL = "EXTERNAL",
}

export enum OrganizedBy {
  All = "all",
  BCA = "bca",
  BBA = "bba",
  BCom = "bcom",
  BSc = "bsc",
  BA = "ba",
  BVoc = "bvoc",
}

export enum EventType {
  INTERCOLLEGIATE = "intercollegiate",
  INTERDEPARTMENT = "interdepartment",
  SEMINAR = "seminar",
  WORKSHOP = "workshop",
  HACKATHON = "hackathon",
  CONFERENCE = "conference",
  MEETUP = "meetup",
}

export enum HttpStatusCode {
  // Success Codes
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,

  // Client Error Codes
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  Conflict = 409,
  UnprocessableEntity = 422,

  // Server Error Codes
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PosterType {
  export type Title = string;

  export type EventImage = {
    title: string;
    imageUrl: string;
  };

  export type Description = JSONContent;

  export type EventType = string;

  export type EventMetadata = {
    date: string;
    time: string;
    location: string;
  };

  export type MetadataItem = {
    icon: React.ReactNode;
    text: string;
  };

  export type EndDate = string;

  export type Phone = string;
}

export type NormalizedFormData = {
  poster: {
    title: string;
    date: string;
    picture: string;
    time: {
      hour: number;
      minute: number;
    };
    description: string[];
    brochure: string;
    venue: string;
    phone: string;
    registration: {
      individual: boolean;
      end: string;
    };
    eventType: string;
    organizedBy: string;
  };
  events: z.infer<typeof eventsSchema>[];
  link: string;
  formType: FormType;
};

export type ProgramDeleteBody = {
  programSlug: string;
};

export type FormattedEvent = {
  eventId: string;
  title: string;
  caption: string;
  teamSize: number;
  Participants: {
    name: string | null;
    email: string;
  }[];
  EventHead: {
    name: string | null;
    email: string;
  }[];
};

export type Poster = {
  title: string;
  image: string;
  eventType: string;
  organizedBy: string;
  date: string;
  time: string;
  venue: string;
  brochure: string;
  description: string;
  contact: string;
  endDate: string;
  link: string | null;
};

export interface userList {
  name: string | null;
  roll: number;
}

export interface EventList {
  programSlug: string;
  title: string;
  image: string;
  eventType?: string;
  organizedBy: string;
  description?: string;
}

export enum queryType {
  all = "all",
  trending = "trending",
  newest = "newest",
  upcoming = "upcoming",
  oldest = "oldest",
}

export interface JoinedTeam {
  teamId: string;
  teamName: string | null;
  teamKey: string;
  teamLeaderId: string;
  program: {
    programSlug: string;
    title: string | undefined;
    eventType: string | undefined;
    organizedBy: string | undefined;
    description: string | undefined;
    image: string | undefined;
  };
}

export interface MyProgram {
  programId: string;
  programSlug: string;
  Poster: {
    title: string;
    image: string;
    date: Date;
    eventType: string;
    organizedBy: string;
  } | null;
}

export interface HeadsEvent {
  eventName: string;
  eventId: string;
  eventCaption: string;
  programSlug: string;
  programImage: string | undefined;
  programTitle: string | undefined;
  programOrganizedBy: string | undefined;
  ProgrameType: string | undefined;
}

export interface TeamForEvent {
  teamId: string;
  teamKey: string;
  Participant: {
    User: {
      name: string | null;
      email: string;
    };
    userId: string;
  }[];
}

export type typeOfEventTypes={
  label: string;
  value: string;
}

export type ProfileProgramCardProps = {
  image: string;
  title: string;
  eventType: string;
  brochure: string;
  link: string;
  date: string;
};