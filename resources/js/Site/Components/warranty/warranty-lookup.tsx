"use client";

import { useState } from "react";

export function WarrantyLookup() {
  const [status, setStatus] = useState<"idle" | "success" | "not-found">("idle");

  return (
    <section className="warranty-shell">
      <div className="warranty-form-card">
        <form className="warranty-form" onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const serial = String(formData.get("serial") || "");
          setStatus(serial.toLowerCase().includes("fail") ? "not-found" : "success");
        }}>
          <label>
            <span>Serial Number</span>
            <input name="serial" placeholder="e.g. EFP-2024-X99" required />
          </label>
          <button type="submit">Verify Status →</button>
        </form>
        <p>The serial number is typically located on the silver sticker underneath your product.</p>
      </div>

      {status === "success" && <div className="warranty-result"><div className="warranty-result-head"><div><h2>Industrial Controller X99</h2><span>S/N: EFP-2024-X99</span></div><b>Active</b></div><div className="warranty-grid"><div><span>Purchase Date</span><strong>October 15, 2023</strong></div><div><span>Warranty Expiry</span><strong>October 15, 2026</strong></div><div className="full"><span>Coverage Details</span><strong>Standard 3-Year Enterprise Hardware Protection. Includes next-business-day advanced replacement.</strong></div></div><div className="warranty-actions"><button type="button">Download Certificate</button><button type="button">Open Support Ticket</button></div></div>}
      {status === "not-found" && <div className="warranty-empty"><strong>Product Not Found</strong><p>We could not locate a product with that serial number. Please verify the number and try again.</p></div>}
    </section>
  );
}
