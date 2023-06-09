import { Component, Injectable, VERSION } from '@angular/core';
import { saveAs } from 'file-saver';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private location: Location) { }

  exportAsExcelFile(json: any[], excelFileName: string): void {  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);  
    const workbook: XLSX.WorkBook = { Sheets: { [excelFileName]: worksheet }, SheetNames: [excelFileName] };  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });  
    this.saveAsExcelFile(excelBuffer, excelFileName);  
  }  
  
  saveAsExcelFile(buffer: any, fileName: string): void {  
     const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});  
     saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);  
  }
  
  ObtenerURLImagen(nombreArchivo: string): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, nombreArchivo);
  
    return getDownloadURL(storageRef);
  }

  ResolvePath(relativePath: string): string {
    const baseHref = this.location.normalize('/');
    const resolvedPath = Location.joinWithSlash(baseHref, relativePath);
    return resolvedPath;
  }
}
