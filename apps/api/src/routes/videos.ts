import { Router, Request, Response } from 'express';
import { VideoGenerator, VideoOptions } from '../services/videoGenerator';
import { prisma } from '@fct/database';

const router = Router();
const generator = new VideoGenerator();

router.post('/generate', async (req: Request, res: Response): Promise<void> => {
  try {
    const { leagueId, resolution = '1080x1920', fps = 60 } = req.body;

    const league = await prisma.league.findUnique({
      where: { id: leagueId },
      include: {
        seasons: {
          include: { champion: { include: { club: true } } },
          orderBy: { year: 'asc' }
        }
      }
    });

    if (!league) {
      res.status(404).json({ success: false, message: 'League not found' });
      return;
    }

    const championsData = league.seasons
      .filter(s => s.champion)
      .map(s => ({
        year: s.year,
        clubName: s.champion!.club.name,
        logoPath: s.champion!.club.logoUrl,
        primaryColor: s.champion!.club.primaryColor
      }));

    if (championsData.length === 0) {
      res.status(400).json({ success: false, message: 'No champions found for this league' });
      return;
    }

    const options: VideoOptions = {
      leagueName: league.name,
      champions: championsData,
      outputResolution: resolution,
      fps: fps
    };

    const videoPath = await generator.generateTimelineVideo(options);

    res.status(200).json({
      success: true,
      data: {
        videoUrl: `/exports/${videoPath.split('/').pop()}`,
        league: league.name
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

