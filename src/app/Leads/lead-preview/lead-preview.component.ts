import { Component, OnInit } from '@angular/core';
import * as snippet from 'app/main/apps/companies/customers/customer-preview/cust.snippetcode';
import { LeadPreviewService } from '../lead-preview.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-lead-preview',
  templateUrl: './lead-preview.component.html',
  styleUrls: ['./lead-preview.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LeadPreviewComponent implements OnInit {
  public contentHeader: object;
  currentComponent: string;

  // snippet code variables
  public _snippetCodeBasic = snippet.snippetCodeBasic;
  public _snippetCodeFilled = snippet.snippetCodeFilled;
  public _snippetCodeJustified = snippet.snippetCodeJustified;
  public _snippetCodeCenterAlignment = snippet.snippetCodeCenterAlignment;
  public _snippetCodeRightAlignment = snippet.snippetCodeRightAlignment;
  public _snippetCodeVerticallyStackedPills = snippet.snippetCodeVerticallyStackedPills;
  public _snippetCodePillThemes = snippet.snippetCodePillThemes;
  constructor(private navigationService: LeadPreviewService) {}

  ngOnInit(): void {
    this.navigationService.component$.subscribe(component => {
      this.currentComponent = component;
    });
  }
  setComponent(component: string) {
    this.navigationService.setComponent(component);
  }

}
