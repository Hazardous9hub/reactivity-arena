/**
 * Dynamic QR Code Generator & Classroom Poster Modal
 * Features a permanent, unique canonical QR code and 100% reliable poster downloads.
 */

import QRCode from "qrcode";
import { sounds } from "./SoundController.js";

export const CANONICAL_WEBSITE_URL = "https://hazardous9hub.github.io/reactivity-arena/";

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
            <h3 class="qr-title">📱 Permanent QR Code &amp; Poster</h3>
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
              Fixed canonical destination &bull; Guaranteed to remain active &amp; unchanged forever.
            </div>
          </div>

          <div class="qr-actions">
            <a href="./Reactivity-Arena-Permanent-QRCode.png" download="Reactivity-Arena-Permanent-QRCode.png" class="btn btn-secondary btn-sm" id="qr-download-btn">
              📥 Download QR (PNG)
            </a>
            <a href="./Reactivity-Arena-Classroom-Poster.png" download="Reactivity-Arena-Classroom-Poster.png" class="btn btn-primary btn-sm" id="qr-poster-btn">
              🖼️ Save QR Poster (PNG)
            </a>
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
      this.setStatusMessage("✓ Downloading permanent QR code image...");
      setTimeout(() => { this.setStatusMessage(""); }, 3000);
    });

    const posterBtn = this.modalEl.querySelector("#qr-poster-btn");
    posterBtn.addEventListener("click", () => {
      sounds.playClick();
      this.setStatusMessage("✓ Downloading high-res classroom poster...");
      setTimeout(() => { this.setStatusMessage(""); }, 3000);
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

  printClassroomPoster() {
    this.setStatusMessage("Opening print dialog...");

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
          <img src="./Reactivity-Arena-Permanent-QRCode.png" class="qr-img" alt="QR Code" />
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
