import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export interface ChampionData {
  year: string;
  clubName: string;
  logoPath: string;
  primaryColor: string;
}

export interface VideoOptions {
  leagueName: string;
  champions: ChampionData[];
  outputResolution: string;
  fps: number;
}

export class VideoGenerator {
  private tempDir: string;
  private outputDir: string;
  private fontBold: string;
  private fontBlack: string;

  constructor() {
    this.tempDir = path.join(__dirname, '../../temp');
    this.outputDir = path.join(__dirname, '../../public/exports');
    this.fontBold = path.join(__dirname, '../../assets/fonts/Inter-Bold.ttf');
    this.fontBlack = path.join(__dirname, '../../assets/fonts/Inter-Black.ttf');

    if (!fs.existsSync(this.tempDir)) fs.mkdirSync(this.tempDir, { recursive: true });
    if (!fs.existsSync(this.outputDir)) fs.mkdirSync(this.outputDir, { recursive: true });
  }

  public async generateTimelineVideo(options: VideoOptions): Promise<string> {
    const outputFilename = `${options.leagueName.replace(/\s+/g, '_')}_${uuidv4()}.mp4`;
    const outputPath = path.join(this.outputDir, outputFilename);
    
    const listPath = path.join(this.tempDir, `${uuidv4()}_list.txt`);
    let fileListContent = '';
    const generatedClips: string[] = [];

    for (const champ of options.champions) {
      const clipPath = path.join(this.tempDir, `${uuidv4()}.mp4`);
      await this.generateSingleSlide(champ, clipPath, options.fps);
      fileListContent += `file '${clipPath}'\n`;
      generatedClips.push(clipPath);
    }

    fs.writeFileSync(listPath, fileListContent);

    return new Promise((resolve, reject) => {
      ffmpeg()
        .input(listPath)
        .inputOptions(['-f concat', '-safe 0'])
        .outputOptions([
          '-c:v libx264',
          '-preset veryfast',
          '-pix_fmt yuv420p',
          `-r ${options.fps}`,
          '-crf 23'
        ])
        .save(outputPath)
        .on('end', () => {
          fs.unlinkSync(listPath);
          generatedClips.forEach(c => fs.unlinkSync(c));
          resolve(outputPath);
        })
        .on('error', (err) => {
          reject(err);
        });
    });
  }

  private generateSingleSlide(champ: ChampionData, outputPath: string, fps: number): Promise<void> {
    return new Promise((resolve, reject) => {
      ffmpeg()
        .input('color=c=#0f172a:s=1080x1920:r=' + fps + ':d=2')
        .inputFormat('lavfi')
        .input(champ.logoPath)
        .complexFilter([
          '[1:v]scale=500:500[logo]',
          '[0:v][logo]overlay=(W-w)/2:(H-h)/2-200[v1]',
          `[v1]drawtext=fontfile='${this.fontBold}':text='${champ.year}':fontcolor=white:fontsize=140:x=(w-text_w)/2:y=(h-text_h)/2+200[v2]`,
          `[v2]drawtext=fontfile='${this.fontBlack}':text='${champ.clubName}':fontcolor=${champ.primaryColor}:fontsize=100:x=(w-text_w)/2:y=(h-text_h)/2+380[v3]`
        ])
        .outputOptions(['-map [v3]', '-c:v libx264', '-preset ultrafast'])
        .save(outputPath)
        .on('end', () => resolve())
        .on('error', reject);
    });
  }
}
