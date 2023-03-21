import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToolsService } from '../tools.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounce, debounceTime } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private toolsService: ToolsService
  ) {}

  public tools: any;
  public aitools: any;
  public categories: any;
  public form: FormGroup;
  public selectedCategory: any;
  public items: any;
  public isSearching = false;

  ngOnInit(): void {
    this.form = new FormGroup({
      category: new FormControl(''),
      searchName: new FormControl(''),
    });

    this.onChanges();

    this.httpClient
      .get('assets/aitools.csv', { responseType: 'text' })
      .subscribe((elem) => {
        this.tools = elem.split('\n');
        this.tools = this.tools.map((elem, index) => {
          return {
            tool_mage_url: elem.split(',')[0].replaceAll('"', ''),
            tool: elem.split(',')[1].replaceAll('"', ''),
            tool_description: elem.split(',')[2].replaceAll('"', ''),
            category: elem.split(',')[3].replaceAll('"', ''),
            upvotes: elem.split(',')[4].replaceAll('"', ''),
            tags: elem.split(',')[5].replaceAll('"', ''),
          };
        });

        this.toolsService.setTools(this.tools);
        this.setCategories(this.tools);
      });
  }

  onChanges() {
    this.form.get('category').valueChanges.subscribe((category) => {
      this.searchTools(category);
    });

    this.form
      .get('searchName')
      .valueChanges.pipe(debounceTime(400))
      .subscribe((name) => {
        if (!name) return;
        this.items = this.tools.filter((elem) => {
          console.log(elem);
          return elem.tool.toLowerCase().includes(name.toLowerCase());
        });
        console.log(this.items);
        this.isSearching = true;
        // this.searchTools(category);
      });
  }

  clearSearch() {
    this.items = 0;
    this.form.get('searchName').setValue('');
  }

  searchTools(category: string) {
    this.tools.shift();
    const filtered_tools = this.tools.filter(
      (item) => item.category == category
    );
    console.log(category);
    if (category === 'All') {
      this.toolsService.setTools(this.tools);
      return;
    }
    this.toolsService.setTools(filtered_tools);
  }

  setCategories(data: any) {
    const categories = data.map((elem) => {
      return elem.category;
    });

    this.categories = new Set(categories);
    this.categories = Array.from(this.categories);
    this.categories.sort();
    this.categories.push('All');
    this.categories.reverse();
    this.toolsService.setCategories(this.categories);
  }
}
