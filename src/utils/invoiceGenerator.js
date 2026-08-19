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
  const pageWidth = doc.internal.pageSize.width;  // 210mm
  const pageHeight = doc.internal.pageSize.height; // 297mm

  // 0. PAGE BACKGROUND (light grey, sits behind everything below the header)
  doc.setFillColor(238, 241, 246); // #eef1f6
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // 1. TOP NAVY BLUE GEOMETRIC HEADER
  doc.setFillColor(30, 45, 74); // #1e2d4a
  doc.setDrawColor(30, 45, 74);
  doc.lines(
    [
      [pageWidth, 0],
      [0, 60],
      [-pageWidth, 100], // steeper diagonal cut
    ],
    0,
    0,
    [1, 1],
    "FD",
    true
  );

  // 1b. BOTTOM NAVY BAR (full width, thin strip)
  doc.setFillColor(30, 45, 74);
  doc.rect(0, pageHeight - 3, pageWidth, 3, "F");

  // 2. BOTTOM-LEFT LIGHT LAVENDER ACCENT TRIANGLE
  doc.setFillColor(186, 197, 219); // #bac5db
  doc.lines(
    [
      [110, 0],
      [-110, -85],
    ],
    0,
    pageHeight,
    [1, 1],
    "FD",
    true
  );

  // 3. MAIN WHITE CARD CONTAINER
  const cardX = 14;
  const cardY = 62;
  const cardW = pageWidth - cardX * 2;
  const cardH = 175;
  const cardRadius = 4;

  doc.setFillColor(255, 255, 255);
  doc.roundedRect(cardX, cardY, cardW, cardH, cardRadius, cardRadius, "F");

  // 4. HEADER BRANDING & LOGO
  const logoUrl = "/images/brand/desikart-logo-withbg.png"; // Replace with your logo path
  try {
    const logoData = await loadImageAsBase64(logoUrl);
    if (logoData) {
      doc.addImage(logoData, "PNG", 18, 14, 22, 22);
    }
  } catch (e) {
    console.warn("Logo failed to load:", e);
  }

  // Restaurant Information
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

  // Right-aligned INVOICE title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("INVOICE", pageWidth - 18, 26, { align: "right" });

  // 5. BILL TO & INVOICE META DETAILS
  const metaY = cardY + 12;

  // Left - Customer
  doc.setTextColor(20, 20, 20);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("BILL TO", cardX + 6, metaY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(orderData.customerName || "Customer", cardX + 6, metaY + 5.5);

  // Right - Meta info
  const metaLabelX = 110;
  const metaValueX = pageWidth - cardX - 6;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("INVOICE #", metaLabelX, metaY);
  doc.text("DATE", metaLabelX, metaY + 5.5);

  doc.setFont("helvetica", "normal");
  const formattedInvoiceNum = `DKC${orderData.orderId || Date.now().toString().slice(-8)}`;
  const dateString = new Date().toLocaleDateString("en-GB"); // DD/MM/YYYY

  doc.text(formattedInvoiceNum, metaValueX, metaY, { align: "right" });
  doc.text(dateString, metaValueX, metaY + 5.5, { align: "right" });

  // 6. ORDER ITEMS TABLE
  const tableRows = (orderData.items || []).map((item) => [
    item.name + (item.serving ? ` (${item.serving})` : ""),
    item.quantity || 1,
    `Rs${Number(item.price).toFixed(2)}`,
    `Rs${(Number(item.price) * (item.quantity || 1)).toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: metaY + 14,
    margin: { left: cardX + 6, right: cardX + 6 },
    head: [["Description", "QTY", "Price", "Amount"]],
    body: tableRows,
    theme: "plain",
    headStyles: {
      fillColor: [238, 241, 246], // #eef1f6 light grey banner
      textColor: [20, 20, 20],
      fontStyle: "bold",
      fontSize: 9,
      cellPadding: 3,
    },
    bodyStyles: {
      textColor: [50, 50, 50],
      fontSize: 8.5,
      cellPadding: 2.8,
    },
    columnStyles: {
      0: { halign: "left" },
      1: { halign: "center", cellWidth: 20 },
      2: { halign: "right", cellWidth: 32 },
      3: { halign: "right", cellWidth: 32 },
    },
  });

  // 7. TOTALS SUMMARY & BALANCE DUE BAR
  let currentY = Math.max(doc.lastAutoTable.finalY + 8, cardY + 55);

  const summaryLabelX = 135;
  const summaryValueX = pageWidth - cardX - 8;

  const subtotal = Number(orderData.subtotal || 0).toFixed(2);
  const total = Number(orderData.total || 0).toFixed(2);
  const paid = "0.00";
  const balanceDue = total;

  doc.setFontSize(8.5);
  doc.setTextColor(30, 30, 30);

  // Subtotal
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal", summaryLabelX, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(`Rs${subtotal}`, summaryValueX, currentY, { align: "right" });

  // Total
  currentY += 7;
  doc.setFont("helvetica", "bold");
  doc.text("Total", summaryLabelX, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(`Rs${total}`, summaryValueX, currentY, { align: "right" });

  // Paid
  currentY += 7;
  doc.setFont("helvetica", "bold");
  doc.text("Paid", summaryLabelX, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(`Rs${paid}`, summaryValueX, currentY, { align: "right" });

  // BALANCE DUE STRIP
  currentY += 6;
  const stripH = 8;
  doc.setFillColor(238, 241, 246); // #eef1f6
  doc.rect(summaryLabelX - 4, currentY - 5, (summaryValueX - summaryLabelX) + 12, stripH, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(20, 20, 20);
  doc.text("BALANCE DUE", summaryLabelX, currentY);
  doc.text(`Rs${balanceDue}`, summaryValueX, currentY, { align: "right" });

  // 8. PAYMENT METHOD (Left side of card)
  const paymentY = currentY;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("Payment Method", cardX + 6, paymentY - 3);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  doc.text("Online Transfer", cardX + 6, paymentY + 2.5);

  // 9. TERMS OR NOTES (Outside card, bottom-left)
  const notesY = cardY + cardH + 18;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(20, 20, 20);
  doc.text("Terms Or Notes", cardX + 6, notesY);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(70, 70, 70);
  doc.text("Thanks for your business.", cardX + 6, notesY + 5);

  // 10. TRIGGER DOWNLOAD
  doc.save(`Invoice_${formattedInvoiceNum}.pdf`);
};