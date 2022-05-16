
export enum TaskStatus {
    Created = 0,
    InProgress = 1,
    Done = 2
}

export interface TaskDTO {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}