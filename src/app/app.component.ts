import {Component} from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from './vfs_fonts.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  closeResult: string;
  schoolName = '南小一(7)班';

  constructor(private modalService: NgbModal) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // Roboto font is the default one
    pdfMake.fonts = {
      Roboto: {
        normal: 'simkai.ttf',
        bold: 'simkai.ttf',
        italics: 'simkai.ttf',
        bolditalics: 'simkai.ttf'
      },
      FontAwesome: {
        normal: 'FontAwesome.ttf',
        bold: 'FontAwesome.ttf',
        italics: 'FontAwesome.ttf',
        bolditalics: 'FontAwesome.ttf'
      }
    };
  }

  downloadOralCalc() {
    // Get kousuan formula array
    const oralCalcs = this.generateOralCalcs();
    const dd = this.getContent(oralCalcs);
    const blob = new Blob([JSON.stringify(dd)], {type: 'text/plain'});
    // this.download(blob, 'lianxi.json');
    pdfMake.createPdf(dd).download('口算练习.pdf');
  }

  downloadOralCalc100() {
    // Get kousuan formula array
    const oralCalcs = this.generateOralCalcs100();
    const dd = this.getContent(oralCalcs);
    const blob = new Blob([JSON.stringify(dd)], {type: 'text/plain'});
    // this.download(blob, 'lianxi.json');
    pdfMake.createPdf(dd).download('口算练习.pdf');
  }

  downloadSubOralCalc() {
    // Get kousuan formula array
    const oralCalcs = this.generateSubOralCalcs();
    const dd = this.getContent(oralCalcs);
    const blob = new Blob([JSON.stringify(dd)], {type: 'text/plain'});
    // this.download(blob, 'lianxi.json');
    pdfMake.createPdf(dd).download('减法口算练习.pdf');
  }

  downloadSub100OralCalc() {
    // Get kousuan formula array
    const oralCalcs = this.generateSub100OralCalcs();
    const dd = this.getContent(oralCalcs);
    const blob = new Blob([JSON.stringify(dd)], {type: 'text/plain'});
    // this.download(blob, 'lianxi.json');
    pdfMake.createPdf(dd).download('100以内减法口算练习.pdf');
  }

  downloadSub10OralCalc() {
    // Get kousuan formula array
    const oralCalcs = this.generateSub10OralCalcs();
    const dd = this.getContent(oralCalcs);
    const blob = new Blob([JSON.stringify(dd)], {type: 'text/plain'});
    // this.download(blob, 'lianxi.json');
    pdfMake.createPdf(dd).download('10以内减法口算练习.pdf');
  }


  generateOralCalcs() {
    const oralCalcs = [];
    for (let i = 0; i < 5; i++) {
      oralCalcs.push(this.generateFormulaList());
    }
    return oralCalcs;
  }

  generateOralCalcs100() {
    const oralCalcs = [];
    for (let i = 0; i < 5; i++) {
      oralCalcs.push(this.generateAddFormula100List());
    }
    return oralCalcs;
  }

  generateOralCalcs10() {
    const oralCalcs = [];
    for (let i = 0; i < 5; i++) {
      oralCalcs.push(this.generateAddFormula10List());
    }
    return oralCalcs;
  }

  generateSubOralCalcs() {
    const oralCalcs = [];
    for (let i = 0; i < 5; i++) {
      oralCalcs.push(this.generateSubFormulaList());
    }
    return oralCalcs;
  }

  generateSub100OralCalcs() {
    const oralCalcs = [];
    for (let i = 0; i < 5; i++) {
      oralCalcs.push(this.generateSubFormula100List());
    }
    return oralCalcs;
  }

  generateSub10OralCalcs() {
    const oralCalcs = [];
    for (let i = 0; i < 5; i++) {
      oralCalcs.push(this.generateSubFormula10List());
    }
    return oralCalcs;
  }

  getContent(kousuans: any[]): any {
    // Define contents
    const contents: any[] = [];
    // Add header
    contents.push({
      alignment: 'center',
      text: this.schoolName,
      style: 'header',
      lineHeight: 1.5
    });
    // Add name and class
    contents.push({alignment: 'center', text: '班级_______ 姓名______', style: 'header', lineHeight: 2});

    // Column quantity
    const columnQuantities = kousuans.length;
    // Rotate arrary and add into contents
    for (let i = 0; i < 29; i++) {
      const row = {
        alignment: 'justify',
        columns: [],
        lineHeight: 1.8
      };
      for (let j = 0; j < columnQuantities; j++) {
        row.columns.push(kousuans[j][i]);
      }
      contents.push(row);
    }
    // Define dd of PDF
    const dd = {
      content: contents,
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        bigger: {
          fontSize: 15,
          italics: true
        }
      },
      defaultStyle: {
        columnGap: 15
      }
    };
    return dd;
  }

  generateFormulaList(): string[] {
    const list = [];
    let subFormulaInserted = false;
    for (let i = 0; i < 29; i++) {
      if (!subFormulaInserted) {
        const random = Math.floor((Math.random() * 30) + 1);
        if (i > random) {
          list.push(this.getSubFormula());
          subFormulaInserted = true;
          continue;
        }
      }
      list.push(this.getAddFormula());
    }
    return list;
  }

  generateAddFormula100List(): string[] {
    const list = [];
    for (let i = 0; i < 29; i++) {
      list.push(this.getAddFormula100());
    }
    return list;
  }

  generateAddFormula10List(): string[] {
    const list = [];
    for (let i = 0; i < 29; i++) {
      list.push(this.getAddFormula10());
    }
    return list;
  }

  generateSubFormulaList(): string[] {
    const list = [];
    for (let i = 0; i < 29; i++) {
      list.push(this.getSubFormula());
    }
    return list;
  }

  generateSubFormula100List(): string[] {
    const list = [];
    for (let i = 0; i < 29; i++) {
      list.push(this.getSubFormulaUnder100());
    }
    return list;
  }

  generateSubFormula10List(): string[] {
    const list = [];
    for (let i = 0; i < 29; i++) {
      list.push(this.getSubFormulaUnder10());
    }
    return list;
  }

  getAddFormula(): string {
    const opA = Math.floor((Math.random() * 10) + 1);
    const opB = Math.floor((Math.random() * 20) + 1);
    if ((opA + opB) >= 20) {
      return this.getAddFormula();
    }
    return opA + ' + ' + opB + ' =';
  }

  getAddFormula100(): string {
    const opA = this.getRandomNumber(50, 11);
    const opB = this.getRandomNumber(50, 11);
    return opB + ' + ' + opA + ' =';
  }

  getAddFormula10(): string {
    const opA = this.getRandomNumber(10, 1);
    const opB = this.getRandomNumber(10, 1);
    if ((opA + opB) > 10) {
      return this.getAddFormula10();
    }
    return opB + ' + ' + opA + ' =';
  }

  getSubFormula(): string {
    const opA = this.getRandomNumber(9, 1);
    const opB = this.getRandomNumber(19, 11);
    return opB + ' - ' + opA + ' =';
  }

  getSubFormulaUnder100() {
    const opA = this.getRandomNumber(100, 50);
    const opB = this.getRandomNumber(50, 1);
    return opA + ' - ' + opB + ' =';
  }

  getSubFormulaUnder10() {
    const opA = this.getRandomNumber(10, 5);
    const opB = this.getRandomNumber(5, 1);
    return opA + ' - ' + opB + ' =';
  }

  download(blob: Blob, fileName: string) {
    // Internet Explorer does not allow opening Blob via ObjectURL
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, fileName);
    } else {
      const url = window.URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
    }
  }

  getRandomNumber(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  downloadOralCalc10() {
    // Get kousuan formula array
    const oralCalcs = this.generateOralCalcs10();
    const dd = this.getContent(oralCalcs);
    const blob = new Blob([JSON.stringify(dd)], {type: 'text/plain'});
    // this.download(blob, 'lianxi.json');
    pdfMake.createPdf(dd).download('10以内加算练习.pdf');
  }
}
