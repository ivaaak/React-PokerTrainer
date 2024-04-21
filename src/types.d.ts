type Mode = 'Preflop' | 'Flop' | 'River' | 'Turn';

type PlayStyle = 'Tight Passive' | 'Loose Passive' | 'Tight Aggressive (TAG)' | 'Loose Aggressive (LAG)';

type Card = {
    suit: string;
    rank: string;
};
