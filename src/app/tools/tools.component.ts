import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from '../tools.service';
import { filter, pipe } from 'rxjs';
import { ToolData } from '../interfaces/ToolData';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
})
export class ToolsComponent implements OnInit {
  public tools: any;
  public aitools: any;
  constructor(
    private httpClient: HttpClient,
    private toolsService: ToolsService
  ) {}

  ngOnInit(): void {
    this.getTools();
  }

  public getTools() {
    this.toolsService.getTools().subscribe((elem) => {
      this.aitools = elem;
      if (this.aitools[0].tool == 'tool') this.aitools.shift();
    });
  }
}
