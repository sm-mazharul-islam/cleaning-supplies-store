import { jsPDF } from "jspdf";
import { toast } from "react-toastify";

export const downloadOrderSummary = (order: any) => {
  try {
    const doc = new jsPDF();

    // PDF Design: Header Background
    doc.setFillColor(37, 99, 235); // Primary Blue Color
    doc.rect(0, 0, 210, 40, "F");

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("BESA LUXURY RENTAL", 20, 25);

    // Body Text
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text("ORDER SUMMARY REPORT", 20, 55);

    doc.setFontSize(10);
    doc.text(`Order ID: ${order._id}`, 20, 70);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 20, 78);
    doc.text(`Customer Email: ${order.userEmail}`, 20, 86);

    // Separator Line
    doc.setLineWidth(0.5);
    doc.line(20, 95, 190, 95);

    // Product Details Table-like Structure
    doc.setFontSize(12);
    doc.text("Product Details:", 20, 110);
    doc.setFontSize(10);
    doc.text(`Title: ${order.items[0]?.title}`, 30, 120);
    doc.text(`Brand: ${order.items[0]?.brand}`, 30, 130);
    doc.text(`Price: $${order.totalAmount}`, 30, 140);
    doc.text(`Status: ${order.status.toUpperCase()}`, 30, 150);

    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you for choosing Besa Luxury Rental.", 20, 280);

    doc.save(`Besa_Order_${order._id.slice(-6)}.pdf`);
    toast.success("Summary downloaded successfully!");
  } catch (error) {
    console.error("PDF Generation Error:", error);
    toast.error("Failed to download summary.");
  }
};
