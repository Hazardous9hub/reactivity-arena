/**
 * Dynamic QR Code Generator & Classroom Poster Modal
 * Allows the sister / teacher to project or print high-res QR codes for students.
 */

import QRCode from "qrcode";

export class QRModal {
  constructor() {
    this.modalEl = null;
    this.canvasEl = null;
    this.currentUrl = window.location.href;
    this.createDom();
  }

  createDom() {
    const wrapper = document.createElement("div");
    wrapper.id = "qr-modal-container";
    wrapper.className = "qr-modal-backdrop hidden";
    wrapper.innerHTML = `
      <div class="qr-modal-content">
        <div class="qr-modal-header">
          <div class="qr-title-group">
            <span class="qr-badge">CBSE CLASS 10 &bull; CHAPTER 3</span>
            <h3 class="qr-title">📱 Scan to Play Alchemix 3D</h3>
          </div>
          <button class="qr-close-btn" id="qr-close-btn" aria-label="Close modal">&times;</button>
        </div>

        <div class="qr-body">
          <div class="qr-canvas-wrapper" id="qr-canvas-wrapper">
            <canvas id="qr-code-canvas"></canvas>
            <div class="qr-scan-pulse"></div>
          </div>

          <p class="qr-instruction">
            Scan this QR code with any smartphone camera or Google Lens to immediately launch the interactive 3D laboratory and puzzles!
          </p>

          <div class="qr-url-box">
            <input type="text" id="qr-custom-url" class="qr-url-input" value="${this.currentUrl}" />
            <button class="qr-update-btn" id="qr-update-btn">Update QR</button>
          </div>

          <div class="qr-actions">
            <button class="btn btn-secondary" id="qr-download-btn">
              📥 Download QR Image
            </button>
            <button class="btn btn-primary" id="qr-print-btn">
              🖨️ Print Classroom Poster (A4)
            </button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);

    this.modalEl = wrapper;
    this.canvasEl = wrapper.querySelector("#qr-code-canvas");

    this.bindEvents();
    this.generateQR(this.currentUrl);
  }

  bindEvents() {
    const closeBtn = this.modalEl.querySelector("#qr-close-btn");
    closeBtn.addEventListener("click", () => this.hide());

    this.modalEl.addEventListener("click", (e) => {
      if (e.target === this.modalEl) this.hide();
    });

    const updateBtn = this.modalEl.querySelector("#qr-update-btn");
    const input = this.modalEl.querySelector("#qr-custom-url");
    updateBtn.addEventListener("click", () => {
      const url = input.value.trim();
      if (url) {
        this.currentUrl = url;
        this.generateQR(url);
      }
    });

    const downloadBtn = this.modalEl.querySelector("#qr-download-btn");
    downloadBtn.addEventListener("click", () => this.downloadQR());

    const printBtn = this.modalEl.querySelector("#qr-print-btn");
    printBtn.addEventListener("click", () => this.printClassroomPoster());
  }

  generateQR(text) {
    if (!this.canvasEl) return;
    QRCode.toCanvas(this.canvasEl, text, {
      width: 250,
      margin: 2,
      color: {
        dark: "#00f2fe",
        light: "#0a0e17"
      }
    }, (error) => {
      if (error) {
        console.error("QR generation error, falling back to standard colors", error);
        QRCode.toCanvas(this.canvasEl, text, { width: 250, margin: 2 });
      }
    });
  }

  downloadQR() {
    if (!this.canvasEl) return;
    const link = document.createElement("a");
    link.download = "Alchemix-Class10-Metals-QRCode.png";
    link.href = this.canvasEl.toDataURL("image/png");
    link.click();
  }

  printClassroomPoster() {
    const qrDataUrl = this.canvasEl.toDataURL("image/png");
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups to print the classroom poster.");
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Alchemix 3D - Class 10 Science Poster</title>
        <style>
          @page { size: A4 portrait; margin: 15mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; color: #111; padding: 20px; }
          .header-badge { font-size: 14px; text-transform: uppercase; letter-spacing: 2px; color: #2563eb; font-weight: bold; }
          h1 { font-size: 28px; margin: 8px 0 4px; color: #0f172a; }
          h2 { font-size: 18px; color: #64748b; font-weight: 500; margin-bottom: 24px; }
          .qr-box { display: inline-block; padding: 16px; border: 3px solid #2563eb; border-radius: 16px; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .qr-img { width: 260px; height: 260px; }
          .callout { font-size: 20px; font-weight: bold; margin: 20px 0 10px; color: #1e293b; }
          .subtext { font-size: 14px; color: #475569; max-width: 500px; margin: 0 auto 30px; line-height: 1.5; }
          .features { display: flex; justify-content: space-around; max-width: 600px; margin: 0 auto; text-align: left; }
          .feat-col { flex: 1; padding: 0 12px; }
          .feat-col h4 { margin: 0 0 6px; color: #0284c7; }
          .feat-col p { margin: 0; font-size: 12px; color: #64748b; }
          .footer { margin-top: 40px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 12px; }
        </style>
      </head>
      <body>
        <div class="header-badge">CBSE Class 10 Science &bull; Chapter 3</div>
        <h1>⚗️ METALS &amp; NON-METALS</h1>
        <h2>Interactive 3D Science Arcade &amp; Board Exam Puzzles</h2>

        <div class="qr-box">
          <img src="${qrDataUrl}" class="qr-img" alt="QR Code" />
        </div>

        <div class="callout">👉 Scan with your Phone Camera to Play!</div>
        <p class="subtext">
          Zero login required. Explore 3D electron transfers, electrolytic copper refining, solve LinkedIn-style Crossclimb &amp; Pinpoint puzzles, and master all past CBSE board questions!
        </p>

        <div class="features">
          <div class="feat-col">
            <h4>🧗 Crossclimb</h4>
            <p>Master the Reactivity Series ladder and displacement reactions.</p>
          </div>
          <div class="feat-col">
            <h4>🎯 Pinpoint</h4>
            <p>5-clue deductive challenges guessing mystery elements.</p>
          </div>
          <div class="feat-col">
            <h4>🔬 3D WebGL Lab</h4>
            <p>Interactive simulations of electrolytic refining and crystal structures.</p>
          </div>
        </div>

        <div class="footer">
          Created for Class 10 Students &bull; Alchemix 3D &bull; Compatible with all smartphone browsers
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  }

  show() {
    if (this.modalEl) {
      this.modalEl.classList.remove("hidden");
      this.generateQR(this.currentUrl);
    }
  }

  hide() {
    if (this.modalEl) {
      this.modalEl.classList.add("hidden");
    }
  }
}
