import { Component, OnInit } from '@angular/core';
import { ReportService, SharedService, PostoService } from '@services';
import { Report, PatientReport } from '@models';
import { Router } from '@angular/router';
import { Posto } from '@models';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

    public report: Report;
    public patientReport: PatientReport;
    public patientTitle: string;
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
        this.isLoading = true;
        this.reportService.getReportByHealthCenter('').subscribe(report => {
            this.report = report;
            this.isLoading = false;
        }, err => {
            // this.errorMessage = err.error[Object.keys(err.error)[0]][0] + ': ' + Object.keys(err.error)[0];
            this.isLoading = false;
        });
        this.isLoading = true;
        this.reportService.getReportByPatient('').subscribe(report => {
            this.patientReport = report;
            this.isLoading = false;
        }, err => {
            // this.errorMessage = err.error[Object.keys(err.error)[0]][0] + ': ' + Object.keys(err.error)[0];
            this.isLoading = false;
        });
    }
    public getReport(healthCenterId: string) {
        this.isLoading = true;
        this.reportService.getReportByHealthCenter(healthCenterId).subscribe(report => {
            this.report = report;
            this.isLoading = false;
        }, err => {
            console.log(err);
            this.isLoading = false;
        });
    }
    public getReportForPatient(healthCenterId: string, posto: string) {
        this.isLoading = true;
        if (healthCenterId) {
            this.patientTitle = 'Todos os pacientes';
        } else {

        }
        this.reportService.getReportByPatient(healthCenterId).subscribe(report => {
            this.patientReport = report;
            this.isLoading = false;
        }, err => {
            console.log(err);
            this.isLoading = false;
        });
    }
    public back() {
        this.router.navigate(['/']);
    }
}
