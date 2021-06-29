import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(private readonly title: Title) { }

  setDefaultTitle(): void {
    if (this.getTitle() !== "HyvesClone" ) {
      this.title.setTitle("HyvesClone");
    }
  }

  setTitle(title: string): void {
    this.title.setTitle(title);
  }

  getTitle(): string {
    return this.title.getTitle();
  }

}
