import { nanoid } from 'nanoid';

export default class Task {
  public id: string;
  public creationDate: string;
  public title: string;
  public description: string;
  public dueDate: string;
  public priority: number;
  public completed: boolean;
  public tags: string[];

  constructor(taskProperties: Partial<Task>) {
    this.id = nanoid();
    this.creationDate = Date.now().toString();
    this.title = taskProperties.title || '';
    this.description = taskProperties.description || '';
    this.dueDate = taskProperties.dueDate || '';
    this.priority = taskProperties.priority || 0;
    this.completed = taskProperties.completed || false;
    this.tags = taskProperties.tags || [];
  }
}
