import { Component, OnInit } from '@angular/core';
import { ReportService } from '@services';
import { Report } from '@models/report';
import { Router } from '@angular/router';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

    public report: Report;
    public isLoading = false;
    
    constructor(private reportService: ReportService,
                private router: Router) { }

    ngOnInit() {
        this.isLoading = true;
        this.reportService.getReport().subscribe(report => {
            this.report = report;
            this.isLoading = false;
        });
    }
    public back() {
        this.router.navigate(['/']); 
      }
}
