type Mode = 'Preflop' | 'Flop' | 'River' | 'Turn';

type PlayStyle = 'tightPassive' | 'loosePassive' | 'tightAggressive' | 'looseAggressive';

type Card = {
    suit: string;
    rank: string;
};
