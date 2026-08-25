import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const loadImageAsBase64 = (url) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
};

export const generateAndDownloadInvoice = async (orderData) => {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // Background
  doc.setFillColor(238, 241, 246);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Top Navy Geometric Header
  doc.setFillColor(30, 45, 74);
  doc.setDrawColor(30, 45, 74);
  doc.lines([[pageWidth, 0], [0, 60], [-pageWidth, 100]], 0, 0, [1, 1], "FD", true);

  // Bottom Navy Bar
  doc.setFillColor(30, 45, 74);
  doc.rect(0, pageHeight - 3, pageWidth, 3, "F");

  // Bottom-Left Accent Triangle
  doc.setFillColor(186, 197, 219);
  doc.lines([[110, 0], [-110, -85]], 0, pageHeight, [1, 1], "FD", true);

  // White Card Container
  const cardX = 14;
  const cardY = 62;
  const cardW = pageWidth - cardX * 2;
  const cardH = 175;
  const cardRadius = 4;
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(cardX, cardY, cardW, cardH, cardRadius, cardRadius, "F");

  // Logo & Branding
  const logoUrl = "/images/brand/desikart-logo-withbg.png";
  try {
    const logoData = await loadImageAsBase64(logoUrl);
    if (logoData) {
      doc.addImage(logoData, "PNG", 18, 14, 22, 22);
    }
  } catch (e) {
    console.warn("Logo failed to load:", e);
  }

  const brandX = 44;
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("DesiKart Cuisine", brandX, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("I-9/4, Islamabad", brandX, 23);
  doc.text("+92 311 50 77779", brandX, 27.5);
  doc.text("desikartcuisine@gmail.com", brandX, 32);
  doc.text("http://www.desikartcuisine.com", brandX, 36.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("INVOICE", pageWidth - 18, 26, { align: "right" });

  // BILL TO & Meta
  const metaY = cardY + 10;
  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("BILL TO", cardX + 6, metaY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(orderData.customerName || "Customer", cardX + 6, metaY + 4.5);

  // Print Address with split text
  if (orderData.address) {
    doc.setFontSize(7.5);
    doc.setTextColor(70, 70, 70);
    const splitAddress = doc.splitTextToSize(orderData.address, 75);
    doc.text(splitAddress, cardX + 6, metaY + 9);
  }

  // Right Meta
  const metaLabelX = 118;
  const metaValueX = pageWidth - cardX - 6;

  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("INVOICE #", metaLabelX, metaY);
  doc.text("DATE", metaLabelX, metaY + 5);

  doc.setFont("helvetica", "normal");
  const formattedInvoiceNum = `DKC${orderData.orderId || Date.now().toString().slice(-8)}`;
  const dateString = new Date().toLocaleDateString("en-GB");

  doc.text(formattedInvoiceNum, metaValueX, metaY, { align: "right" });
  doc.text(dateString, metaValueX, metaY + 5, { align: "right" });

  // Items Table
  const tableRows = (orderData.items || []).map((item) => [
    item.name + (item.serving ? ` (${item.serving})` : ""),
    item.quantity || 1,
    `Rs ${Number(item.price).toFixed(2)}`,
    `Rs ${(Number(item.price) * (item.quantity || 1)).toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: metaY + 20,
    margin: { left: cardX + 6, right: cardX + 6 },
    head: [["Description", "QTY", "Price", "Amount"]],
    body: tableRows,
    theme: "plain",
    headStyles: {
      fillColor: [238, 241, 246],
      textColor: [20, 20, 20],
      fontStyle: "bold",
      fontSize: 8.5,
      cellPadding: 2.8,
    },
    bodyStyles: {
      textColor: [50, 50, 50],
      fontSize: 8,
      cellPadding: 2.5,
    },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "center", cellWidth: 18 },
      2: { halign: "right", cellWidth: 30 },
      3: { halign: "right", cellWidth: 30 },
    },
  });

  // Summary & Breakdown
  let currentY = Math.max(doc.lastAutoTable.finalY + 6, cardY + 65);
  const summaryLabelX = 130;
  const summaryValueX = pageWidth - cardX - 8;

  const subtotal = Number(orderData.subtotal || 0).toFixed(2);
  const deliveryFee = Number(orderData.deliveryFee || 0).toFixed(2);
  const total = Number(orderData.total || 0).toFixed(2);
  const balanceDue = total;

  doc.setFontSize(8);
  doc.setTextColor(30, 30, 30);

  // Subtotal
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal", summaryLabelX, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(`Rs ${subtotal}`, summaryValueX, currentY, { align: "right" });

  // Delivery Fee
  currentY += 5.5;
  doc.setFont("helvetica", "bold");
  doc.text("Delivery Fee", summaryLabelX, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(`Rs ${deliveryFee}`, summaryValueX, currentY, { align: "right" });

  // Total
  currentY += 5.5;
  doc.setFont("helvetica", "bold");
  doc.text("Total", summaryLabelX, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(`Rs ${total}`, summaryValueX, currentY, { align: "right" });

  // Balance Due Strip
  currentY += 6;
  doc.setFillColor(238, 241, 246);
  doc.rect(summaryLabelX - 4, currentY - 4.5, (summaryValueX - summaryLabelX) + 12, 7.5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(20, 20, 20);
  doc.text("BALANCE DUE", summaryLabelX, currentY);
  doc.text(`Rs ${balanceDue}`, summaryValueX, currentY, { align: "right" });

  // Payment Method
  const paymentY = currentY;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("Payment Method", cardX + 6, paymentY - 2);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(60, 60, 60);
  doc.text("Cash on Delivery / Online Transfer", cardX + 6, paymentY + 3);

  // Notes
  const notesY = cardY + cardH + 18;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 20);
  doc.text("Terms Or Notes", cardX + 6, notesY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(70, 70, 70);
  doc.text("Thank you for ordering with DesiKart Cuisine!", cardX + 6, notesY + 4.5);

  // Trigger Download
  doc.save(`Invoice_${formattedInvoiceNum}.pdf`);
};