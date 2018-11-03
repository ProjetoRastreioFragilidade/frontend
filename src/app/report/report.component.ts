import { Component, OnInit } from '@angular/core';
import { ReportService, SharedService, PostoService } from '@services';
import { Report } from '@models/report';
import { Router } from '@angular/router';
import { Posto } from '@models';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

    public report: Report;
    public postos: Posto[] = [];
    public isLoading = false;

    constructor(
        private reportService: ReportService,
        private router: Router,
        private sharedService: SharedService,
        private postoService: PostoService,
    ) { }

    ngOnInit() {
        this.sharedService.startBlockUI();
        this.postoService.listPosto().subscribe(postos => {
          this.postos = postos;
          this.sharedService.stopBlockUI();
        }, err => {
          // this.errorMessage = err.error[Object.keys(err.error)[0]][0] + ': ' + Object.keys(err.error)[0];
          this.sharedService.stopBlockUI();
        });
        this.reportService.getReport('').subscribe(report => {
            this.report = report;
        });
    }
    public getReport(healthCenterId: string) {
        this.isLoading = true;
        // this.sharedService.startBlockUI();
        this.reportService.getReport(healthCenterId).subscribe(report => {
            this.report = report;
            this.isLoading = false;
            // this.sharedService.stopBlockUI();
        }, err => {
            // this.sharedService.stopBlockUI();
            console.log(err);
            this.isLoading = false;
        });
    }
    public back() {
        this.router.navigate(['/']);
    }
}
