declare module 'jspdf' {
    interface jsPDF {
      autoTable: (options: any) => void;
      previousAutoTable: { finalY: number } | undefined;
    }
  }
  
  declare module 'jspdf-autotable';
  