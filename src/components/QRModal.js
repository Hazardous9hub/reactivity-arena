/**
 * Dynamic QR Code Generator & Classroom Poster Modal
 * Features a permanent, unique canonical QR code that never changes or expires.
 */

import QRCode from "qrcode";
import { sounds } from "./SoundController.js";

export const CANONICAL_WEBSITE_URL = "https://hazardous9hub.github.io/reactivity-arena/";

function drawRoundRect(ctx, x, y, width, height, radius) {
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
}

export class QRModal {
  constructor() {
    this.modalEl = null;
    this.canvasEl = null;
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
            <h3 class="qr-title">📱 Permanent QR Code</h3>
          </div>
          <button class="qr-close-btn" id="qr-close-btn" aria-label="Close modal">&times;</button>
        </div>

        <div class="qr-body">
          <div class="qr-canvas-wrapper" id="qr-canvas-wrapper">
            <canvas id="qr-code-canvas"></canvas>
            <div class="qr-scan-pulse"></div>
          </div>

          <p class="qr-instruction">
            Scan this unique QR code with any smartphone camera or Google Lens to immediately launch Reactivity Arena!
          </p>

          <div class="qr-url-box" style="flex-direction: column; align-items: center; background: rgba(0, 242, 254, 0.05); border: 1px solid rgba(0, 242, 254, 0.25); border-radius: var(--radius-sm); padding: 10px 14px; gap: 4px; margin-bottom: 20px;">
            <div style="font-size: 11px; font-weight: 700; color: var(--neon-cyan); letter-spacing: 1px; display: flex; align-items: center; gap: 6px;">
              <span>🔒</span> PERMANENT UNIQUE QR CODE
            </div>
            <div style="font-family: var(--font-mono); font-size: 12px; color: #fff; word-break: break-all;">
              ${CANONICAL_WEBSITE_URL}
            </div>
            <div style="font-size: 10.5px; color: var(--text-muted); margin-top: 2px;">
              Fixed canonical destination &bull; Guaranteed to remain constant &amp; active forever.
            </div>
          </div>

          <div class="qr-actions">
            <button class="btn btn-secondary btn-sm" id="qr-download-btn">
              📥 Download QR (PNG)
            </button>
            <button class="btn btn-primary btn-sm" id="qr-poster-btn">
              🖼️ Save QR Poster (PNG)
            </button>
            <button class="btn btn-secondary btn-sm" id="qr-print-btn">
              🖨️ Print Poster (A4)
            </button>
          </div>
          <div id="qr-status-msg" style="margin-top: 12px; font-size: 12px; color: var(--neon-cyan); min-height: 18px;"></div>
        </div>
      </div>
    `;
    document.body.appendChild(wrapper);

    this.modalEl = wrapper;
    this.canvasEl = wrapper.querySelector("#qr-code-canvas");

    this.bindEvents();
    this.generateQR();
  }

  bindEvents() {
    const closeBtn = this.modalEl.querySelector("#qr-close-btn");
    closeBtn.addEventListener("click", () => this.hide());

    this.modalEl.addEventListener("click", (e) => {
      if (e.target === this.modalEl) this.hide();
    });

    const downloadBtn = this.modalEl.querySelector("#qr-download-btn");
    downloadBtn.addEventListener("click", () => {
      sounds.playClick();
      this.downloadQR();
    });

    const posterBtn = this.modalEl.querySelector("#qr-poster-btn");
    posterBtn.addEventListener("click", () => {
      sounds.playClick();
      this.saveClassroomPoster();
    });

    const printBtn = this.modalEl.querySelector("#qr-print-btn");
    printBtn.addEventListener("click", () => {
      sounds.playClick();
      this.printClassroomPoster();
    });
  }

  generateQR() {
    if (!this.canvasEl) return;
    QRCode.toCanvas(this.canvasEl, CANONICAL_WEBSITE_URL, {
      errorCorrectionLevel: "H",
      width: 250,
      margin: 2,
      color: {
        dark: "#00f2fe",
        light: "#0a0e17"
      }
    }, (error) => {
      if (error) {
        console.error("QR generation error, falling back to standard colors", error);
        QRCode.toCanvas(this.canvasEl, CANONICAL_WEBSITE_URL, {
          errorCorrectionLevel: "H",
          width: 250,
          margin: 2
        });
      }
    });
  }

  downloadQR() {
    if (!this.canvasEl) return;
    try {
      const link = document.createElement("a");
      link.download = "Reactivity-Arena-Permanent-QRCode.png";
      link.href = this.canvasEl.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      this.setStatusMessage("✓ Permanent QR code downloaded!");
    } catch (e) {
      console.error("Download QR error", e);
      this.setStatusMessage("⚠️ Failed to download QR image.");
    }
  }

  saveClassroomPoster() {
    if (!this.canvasEl) return;
    this.setStatusMessage("Rendering high-res classroom poster...");

    const width = 1200;
    const height = 1600;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // 1. Dark Gradient Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, "#080d1a");
    bgGrad.addColorStop(0.5, "#0f172a");
    bgGrad.addColorStop(1, "#070b14");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Neon Cyan Outer & Inner Border
    ctx.strokeStyle = "#00f2fe";
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, width - 80, height - 80);

    // 3. Top Badge Pill
    ctx.fillStyle = "rgba(0, 242, 254, 0.15)";
    drawRoundRect(ctx, 350, 80, 500, 50, 25);
    ctx.fill();
    ctx.strokeStyle = "#00f2fe";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "#00f2fe";
    ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("CBSE CLASS 10 SCIENCE • CHAPTER 3", width / 2, 112);

    // 4. Main Title
    ctx.fillStyle = "#ffffff";
    ctx.font = "800 58px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("REACTIVITY ARENA", width / 2, 195);

    // Subtitle
    ctx.fillStyle = "#f59e0b";
    ctx.font = "600 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("Metals & Non-Metals 3D Arcade & Board Exam Hub", width / 2, 245);

    // 5. White card behind QR code for high camera contrast
    const qrBoxSize = 480;
    const qrBoxX = (width - qrBoxSize) / 2;
    const qrBoxY = 290;

    // Glowing background behind QR card
    ctx.fillStyle = "rgba(0, 242, 254, 0.2)";
    drawRoundRect(ctx, qrBoxX - 15, qrBoxY - 15, qrBoxSize + 30, qrBoxSize + 30, 32);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    drawRoundRect(ctx, qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 24);
    ctx.fill();

    // Draw QR code with high-contrast
    const qrPad = 30;
    ctx.drawImage(this.canvasEl, qrBoxX + qrPad, qrBoxY + qrPad, qrBoxSize - (qrPad * 2), qrBoxSize - (qrPad * 2));

    // 6. Call to Action below QR
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("📱 Scan with Camera or Google Lens to Play!", width / 2, 830);

    // Permanent URL Text
    ctx.fillStyle = "#00f2fe";
    ctx.font = "22px monospace";
    ctx.fillText(CANONICAL_WEBSITE_URL, width / 2, 875);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("Permanent QR Code • Never Expires • Zero Login Required", width / 2, 915);

    // 7. Divider Line
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 960);
    ctx.lineTo(width - 100, 960);
    ctx.stroke();

    // 8. 4 Feature Cards (2x2 Grid)
    const features = [
      { icon: "🧗", title: "Crossclimb Puzzles", desc: "Climb the Reactivity Series with step-by-step reaction clues." },
      { icon: "🎯", title: "Pinpoint Challenge", desc: "Deduce mystery elements from 5 progressive chemical clues." },
      { icon: "⚛️", title: "3D WebGL Labs", desc: "Interactive simulations of ionic lattices and copper refining." },
      { icon: "📋", title: "CBSE Board Secrets", desc: "Top exam traps, balanced reactions, and official marking tips." }
    ];

    const cardW = 460;
    const cardH = 140;
    const col1X = 110;
    const col2X = 630;
    const row1Y = 1000;
    const row2Y = 1170;

    features.forEach((feat, i) => {
      const x = i % 2 === 0 ? col1X : col2X;
      const y = i < 2 ? row1Y : row2Y;

      ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
      drawRoundRect(ctx, x, y, cardW, cardH, 16);
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 242, 254, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.textAlign = "left";
      ctx.fillStyle = "#00f2fe";
      ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.fillText(`${feat.icon} ${feat.title}`, x + 24, y + 45);

      ctx.fillStyle = "#cbd5e1";
      ctx.font = "18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      wrapText(ctx, feat.desc, x + 24, y + 80, cardW - 48, 26);
    });

    // 9. Dedication Card at Bottom
    const dedY = 1350;
    ctx.fillStyle = "rgba(236, 72, 153, 0.12)";
    drawRoundRect(ctx, 110, dedY, width - 220, 160, 20);
    ctx.fill();
    ctx.strokeStyle = "rgba(236, 72, 153, 0.4)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = "#f472b6";
    ctx.font = "bold 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("💖 DEDICATED WITH LOVE TO POOJA & HER STUDENTS", width / 2, dedY + 45);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "italic 20px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText('"Turning Class 10 Science & Reactions into an Adventure of Confidence!"', width / 2, dedY + 85);

    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 18px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    ctx.fillText("🌟 Reactivity Arena • Class 10 Science Interactive Learning Suite 🌟", width / 2, dedY + 125);

    // Direct download as high-res PNG
    try {
      const a = document.createElement("a");
      a.download = "Reactivity-Arena-Classroom-Poster.png";
      a.href = canvas.toDataURL("image/png");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.setStatusMessage("✓ Classroom poster image downloaded!");
    } catch (e) {
      console.error("Poster download error", e);
      this.setStatusMessage("⚠️ Failed to download poster image.");
    }
  }

  printClassroomPoster() {
    if (!this.canvasEl) return;
    this.setStatusMessage("Opening print dialog...");
    const qrDataUrl = this.canvasEl.toDataURL("image/png");

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Reactivity Arena - Class 10 Science Poster</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; text-align: center; color: #111; padding: 10px; margin: 0; }
          .header-badge { font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: #0284c7; font-weight: bold; }
          h1 { font-size: 26px; margin: 6px 0 2px; color: #0f172a; }
          h2 { font-size: 16px; color: #64748b; font-weight: 500; margin-bottom: 18px; }
          .qr-box { display: inline-block; padding: 14px; border: 3px solid #0284c7; border-radius: 16px; background: #fff; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
          .qr-img { width: 240px; height: 240px; display: block; }
          .callout { font-size: 18px; font-weight: bold; margin: 16px 0 6px; color: #1e293b; }
          .subtext { font-size: 13px; color: #475569; max-width: 520px; margin: 0 auto 20px; line-height: 1.5; }
          .features { display: flex; justify-content: space-around; max-width: 600px; margin: 0 auto; text-align: left; gap: 12px; }
          .feat-col { flex: 1; padding: 10px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
          .feat-col h4 { margin: 0 0 4px; color: #0284c7; font-size: 13px; }
          .feat-col p { margin: 0; font-size: 11.5px; color: #64748b; line-height: 1.4; }
          .dedication { margin-top: 24px; padding: 10px; background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 8px; font-size: 12px; color: #db2777; font-weight: 600; }
          .footer { margin-top: 20px; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 10px; }
        </style>
      </head>
      <body>
        <div class="header-badge">CBSE Class 10 Science &bull; Chapter 3</div>
        <h1>⚗️ REACTIVITY ARENA</h1>
        <h2>Metals &amp; Non-Metals 3D Arcade &amp; Board Exam Puzzles</h2>

        <div class="qr-box">
          <img src="${qrDataUrl}" class="qr-img" alt="QR Code" />
        </div>

        <div class="callout">👉 Scan with your Phone Camera or Google Lens to Play!</div>
        <p class="subtext">
          Permanent destination: <strong>${CANONICAL_WEBSITE_URL}</strong><br>
          Zero login required. Explore 3D electron transfers, electrolytic copper refining, solve LinkedIn-style Crossclimb &amp; Pinpoint puzzles, and master all past CBSE board questions!
        </p>

        <div class="features">
          <div class="feat-col">
            <h4>🧗 Crossclimb</h4>
            <p>Master Reactivity Series and displacement.</p>
          </div>
          <div class="feat-col">
            <h4>🎯 Pinpoint</h4>
            <p>5-clue deductive element challenges.</p>
          </div>
          <div class="feat-col">
            <h4>🔬 3D WebGL</h4>
            <p>Interactive crystal lattices &amp; refining.</p>
          </div>
        </div>

        <div class="dedication">
          💖 Specially Dedicated with Love to Pooja &amp; Her Students
        </div>

        <div class="footer">
          Created for Class 10 Students &bull; Reactivity Arena &bull; Free &amp; Compatible with all smartphone browsers
        </div>
      </body>
      </html>
    `;

    // Hidden iframe avoids browser popup blockers
    let iframe = document.getElementById("qr-print-iframe");
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.id = "qr-print-iframe";
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      document.body.appendChild(iframe);
    }

    try {
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(htmlContent);
      doc.close();

      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        this.setStatusMessage("");
      }, 350);
    } catch (e) {
      console.warn("Iframe print fallback to window.open", e);
      const w = window.open("", "_blank");
      if (w) {
        w.document.write(htmlContent);
        w.document.close();
        w.focus();
        w.print();
        this.setStatusMessage("");
      } else {
        this.setStatusMessage("⚠️ Please allow popups to print.");
      }
    }
  }

  setStatusMessage(msg) {
    const el = this.modalEl ? this.modalEl.querySelector("#qr-status-msg") : null;
    if (el) {
      el.textContent = msg;
      if (msg.startsWith("✓")) {
        setTimeout(() => { el.textContent = ""; }, 3500);
      }
    }
  }

  show() {
    if (this.modalEl) {
      this.modalEl.classList.remove("hidden");
      this.generateQR();
      this.setStatusMessage("");
    }
  }

  hide() {
    if (this.modalEl) {
      this.modalEl.classList.add("hidden");
    }
  }
}
