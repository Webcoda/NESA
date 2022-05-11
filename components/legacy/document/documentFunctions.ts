import { savePDF } from '@progress/kendo-react-pdf';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import { detect } from 'detect-browser';
import { isMobile } from 'react-device-detect';
import DocxTemplate, { DocumentOptions } from '../../utilities/docx-template/DocxTemplate';

export function createPDF(body: HTMLElement, callback?: () => void) {
  savePDF(
    body,
    {
      paperSize: 'A4',
      margin: '1cm',
      keepTogether: 'p, li, .pdf-template__header',
      forcePageBreak: '.new-page',
      fileName: 'NSW Curriculum download.pdf',
    },
    callback,
  );
}

function blobToDataURL(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (_e) => resolve(reader.result as string);
    reader.onerror = (_e) => reject(reader.error);
    reader.onabort = (_e) => reject(new Error('Read aborted'));
    reader.readAsDataURL(blob);
  });
}

export const downloadFileUsingDOM = (filename: string, src: string) => {
  const link = document.createElement('a');
  link.download = filename;
  link.target = '_blank';
  // Construct the URI
  link.href = src;
  document.body.appendChild(link);
  link.click();
  // Cleanup the DOM
  document.body.removeChild(link);
};

export function createDocxBlob(documentProps: DocumentOptions) {
  return DocxTemplate(documentProps).then((document) => Packer.toBlob(document));
}

export function createDocx(documentProps: DocumentOptions) {
  const browser = detect();
  const mobileUserUsingChromeAndiOS =
    browser && browser.os === 'iOS' && browser.name === 'crios' && isMobile;

  return DocxTemplate(documentProps).then((document) => {
    Packer.toBlob(document).then((blob) => {
      if (mobileUserUsingChromeAndiOS) {
        const file = blobToDataURL(blob);
        /*
         * At this stage the file generates as document without extension
         * it's a webkit bug that is still being fixed in chromium
         * https://bugs.webkit.org/show_bug.cgi?id=167341
         * https://bugs.chromium.org/p/chromium/issues/detail?id=1252380
         *
         * If the user renames the file, it works fine.
         * we will add a popup recommending to use Safari for this users
         *
         * Also, File saver isnt working at this stage. It shows:
         * The file could not be downloaded at this time
         * */
        Promise.resolve(file)
          .then((res) => {
            downloadFileUsingDOM('NSW Curriculum download.docx', res);
          })
          .catch((err) => console.error('Failed:', err));
      } else {
        // saveAs from FileSaver will download the file
        saveAs(blob, 'NSW Curriculum download.docx');
      }
    });
  });
}

// export const CSVHeaders = [
//   { label: 'First Name', key: 'firstname' },
//   { label: 'Last Name', key: 'lastname' },
//   { label: 'Email', key: 'email' },
// ];
//
// export const CSVData = [
//   { firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' },
//   { firstname: 'Raed', lastname: 'Labes', email: 'rl@smthing.co.com' },
//   { firstname: 'Yezzi', lastname: 'Min l3b', email: 'ymin@cocococo.com' },
// ];
