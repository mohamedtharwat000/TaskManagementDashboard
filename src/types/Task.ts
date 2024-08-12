export default class Task {
  public id: string;
  public title: string;
  public description: string;
  public creationDate: string;
  public dueDate: string;
  public priority: 'normal' | 'high' | 'low';
  public completed: boolean;
  public tags: string[];

  constructor(taskProperties: Partial<Task>) {
    this.id = taskProperties.id
      ? taskProperties.id
      : Math.random().toString().slice(2, 4);
    this.creationDate = new Date().getTime().toString();
    this.title = taskProperties.title ?? '';
    this.description = taskProperties.description ?? '';
    this.dueDate = taskProperties.dueDate ?? '';
    this.priority = taskProperties.priority ?? 'normal';
    this.completed = taskProperties.completed ?? false;
    this.tags = taskProperties.tags ?? [];
  }
}
