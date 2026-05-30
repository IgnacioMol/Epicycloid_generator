import { Component, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PatternService } from '../../core/pattern.service';
import { ExportOptions } from '../../models/pattern-params.model';

@Component({
  selector: 'app-export-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './export-modal.html',
  styleUrl: './export-modal.css',
})
export class ExportModal implements AfterViewInit {
  @Output() close = new EventEmitter<void>();
  @ViewChild('previewCanvas') previewCanvasRef!: ElementRef<HTMLCanvasElement>;

  options: ExportOptions = {
    bgColor: '#0a0a14',
    showGuides: false,
    showCenterDot: false,
  };

  isTransparent = false;

  exportZoom = 1;
  readonly minZoom = 0.2;
  readonly maxZoom = 4;

  exportScale = 1;
  readonly scaleOptions = [1, 2, 4];

  fileName = '';

  get defaultFileName(): string {
    const mode = this.patternService.getCurrentParams().visualizationMode;
    const modeLabel = mode === 'curve' ? 'curva' : 'lineas';
    const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    return `epicycloid_${modeLabel}_${date}`;
  }

  get resolvedFileName(): string {
    return (this.fileName.trim() || this.defaultFileName) + '.png';
  }

  constructor(private patternService: PatternService) {}

  ngAfterViewInit(): void {
    this.renderPreview();
  }

  get exportResolution(): string {
    const { w, h } = this.patternService.canvasDimensions;
    if (w === 0) return '—';
    return `${Math.round(w * this.exportScale)} × ${Math.round(h * this.exportScale)} px`;
  }

  onTransparentToggle(): void {
    this.options = {
      ...this.options,
      bgColor: this.isTransparent ? 'transparent' : '#0a0a14',
    };
    this.renderPreview();
  }

  onOptionChange(): void {
    this.renderPreview();
  }

  private buildExportCanvas(): HTMLCanvasElement {
    const { w: canvasW, h: canvasH } = this.patternService.canvasDimensions;
    const result = document.createElement('canvas');

    if (canvasW === 0 || canvasH === 0) {
      result.width = 400;
      result.height = 300;
      return result;
    }

    const outputW = Math.round(canvasW * this.exportScale);
    const outputH = Math.round(canvasH * this.exportScale);
    result.width = outputW;
    result.height = outputH;
    const ctx = result.getContext('2d')!;

    if (this.options.bgColor !== 'transparent') {
      ctx.fillStyle = this.options.bgColor;
      ctx.fillRect(0, 0, outputW, outputH);
    }

    // Draw all lines at vector quality — no bitmap upscaling
    const history = this.patternService.lineHistory;
    const drawScale = this.exportZoom * this.exportScale;

    ctx.save();
    ctx.translate(outputW / 2, outputH / 2);
    ctx.scale(drawScale, drawScale);

    if (history.length > 0) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      for (const ln of history) {
        ctx.strokeStyle = `rgba(${ln.r},${ln.g},${ln.b},${ln.a / 255})`;
        ctx.lineWidth = ln.sw;
        ctx.beginPath();
        ctx.moveTo(ln.x1, ln.y1);
        ctx.lineTo(ln.x2, ln.y2);
        ctx.stroke();
      }
    }

    const p = this.patternService.getCurrentParams();

    if (this.options.showGuides) {
      ctx.setLineDash([6, 4]);
      ctx.lineWidth = 1.5 / drawScale;

      ctx.strokeStyle = 'rgba(60, 90, 180, 0.8)';
      ctx.save();
      ctx.rotate((p.orbit1Angle * Math.PI) / 180);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.orbit1Radius * p.orbit1EllipseX, p.orbit1Radius * p.orbit1EllipseY, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      ctx.strokeStyle = 'rgba(180, 60, 60, 0.8)';
      ctx.save();
      ctx.rotate((p.orbit2Angle * Math.PI) / 180);
      ctx.beginPath();
      ctx.ellipse(0, 0, p.orbit2Radius * p.orbit2EllipseX, p.orbit2Radius * p.orbit2EllipseY, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    if (this.options.showCenterDot) {
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255, 200, 0, 0.9)';
      ctx.beginPath();
      ctx.arc(0, 0, 5 / drawScale, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
    return result;
  }

  private renderPreview(): void {
    const previewEl = this.previewCanvasRef?.nativeElement;
    if (!previewEl) return;

    const exportCanvas = this.buildExportCanvas();
    const PREVIEW_MAX = 320;
    const scale = Math.min(PREVIEW_MAX / exportCanvas.width, PREVIEW_MAX / exportCanvas.height);
    previewEl.width = Math.round(exportCanvas.width * scale);
    previewEl.height = Math.round(exportCanvas.height * scale);

    const ctx = previewEl.getContext('2d')!;
    ctx.clearRect(0, 0, previewEl.width, previewEl.height);
    ctx.drawImage(exportCanvas, 0, 0, previewEl.width, previewEl.height);
  }

  save(): void {
    const exportCanvas = this.buildExportCanvas();
    const link = document.createElement('a');
    link.download = this.resolvedFileName;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  }
}
