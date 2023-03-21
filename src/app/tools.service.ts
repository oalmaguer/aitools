import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToolData } from './interfaces/ToolData';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor() {}

  public categories = new BehaviorSubject<ToolData>({});
  public categories$ = this.categories.asObservable();

  public tools = new BehaviorSubject([]);
  public tools$ = this.tools.asObservable();

  public toolSelected = new BehaviorSubject([]);
  public toolSelected$ = this.toolSelected.asObservable();

  public setCategories(data: any) {
    this.categories.next(data);
  }

  public getCategories(data: any) {
    return this.categories$;
  }
  public setTools(data: any) {
    this.tools.next(data);
  }

  public getTools() {
    return this.tools$;
  }
  public setToolSelected(data: any) {
    this.toolSelected.next(data);
  }

  public getToolSelected() {
    return this.toolSelected$;
  }
}
