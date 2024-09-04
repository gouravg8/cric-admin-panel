type MatchDocument = {
    matchId: string;
    teamA: string;
    teamB: string;
    currentOver: number;
    currentBall: number;
    score: number;
    batStriker: string;
    batNonStriker: string;
    bowler: string;
    winningTeam?: string;
    oversPlayed: number;
    ballsInCurrentOver: number;
    extras: number;
};

type PlayerDocument = {
    matchId: string;
    teamName: string;
    playerName: string;
    runs: number;
    ballsPlayed: number;
    fours: number;
    sixes: number;
    wickets: number;
    oversBowled: number;
    runsGiven: number;
    isOut: boolean;
    battingPosition: number;
};

type TeamDocument = {
    matchId: string;
    teamName: string;
    totalRuns: number;
    totalWickets: number;
    totalOvers: number;
    players: PlayerDocument[];
    extras: number;
    score: number;
};

type LogDocument = {
    matchId: string;
    over: number;
    ball: number;
    batsman: string;
    bowler: string;
    runs: number;
    timestamp: Date;
};

type Errr = {
    message: string;
};

export {
    MatchDocument,
    PlayerDocument,
    TeamDocument,
    LogDocument,
    Errr
};