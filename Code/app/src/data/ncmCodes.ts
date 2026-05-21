export const NCM_PULP_CODES = [
  '47020000', '47031100', '47031900',
  '47032100', '47032900', '47041100',
  '47042100', '47050000',
] as const;

export type NcmCode = typeof NCM_PULP_CODES[number];

export const NCM_SHORT_LABELS: Record<string, string> = {
  '47020000': 'Celulose dissolução',
  '47031100': 'Kraft conífera — não branqueada',
  '47031900': 'Kraft conífera — branqueada',
  '47032100': 'Kraft não-conífera — não branqueada',
  '47032900': 'Kraft não-conífera — branqueada (BHKP)',
  '47041100': 'Sulfito conífera — não branqueada',
  '47042100': 'Sulfito não-conífera — não branqueada',
  '47050000': 'Pasta semiquímica',
};

export const NCM_FULL_LABELS: Record<string, string> = {
  '47020000': 'Pastas químicas de madeira para dissolução',
  '47031100': 'Pasta kraft de conífera, crua, exceto para dissolução',
  '47031900': 'Pasta kraft de conífera, semibranqueada ou branqueada',
  '47032100': 'Pasta kraft de não conífera, crua, exceto para dissolução',
  '47032900': 'Pasta kraft de não conífera, semibranqueada ou branqueada (BHKP)',
  '47041100': 'Pasta sulfito de conífera, crua, exceto para dissolução',
  '47042100': 'Pasta sulfito de não conífera, crua, exceto para dissolução',
  '47050000': 'Pastas semiquímicas de madeira',
};
