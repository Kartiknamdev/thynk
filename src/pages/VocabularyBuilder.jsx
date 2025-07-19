import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock vocabulary data (expand as needed)
const vocabularyWords = [
  {
    word: 'Aberration',
    meaning: 'A departure from what is normal or expected',
    example: 'The test results showed an aberration from the usual pattern.',
    synonyms: ['anomaly', 'deviation', 'irregularity'],
    antonyms: ['normality', 'regularity'],
  },
  {
    word: 'Benevolent',
    meaning: 'Well meaning and kindly',
    example: 'She was a benevolent host, making everyone feel at home.',
    synonyms: ['kind', 'generous', 'charitable'],
    antonyms: ['malevolent', 'unkind'],
  },
  {
    word: 'Cacophony',
    meaning: 'A harsh, discordant mixture of sounds',
    example: 'The cacophony of car horns filled the street.',
    synonyms: ['din', 'racket', 'discord'],
    antonyms: ['harmony', 'melody'],
  },
  {
    word: 'Diligent',
    meaning: 'Having or showing care and conscientiousness in one’s work or duties',
    example: 'He was diligent in completing his assignments on time.',
    synonyms: ['industrious', 'hardworking', 'assiduous'],
    antonyms: ['lazy', 'careless'],
  },
  {
    word: 'Eloquent',
    meaning: 'Fluent or persuasive in speaking or writing',
    example: 'Her eloquent speech moved the audience.',
    synonyms: ['articulate', 'expressive', 'persuasive'],
    antonyms: ['inarticulate', 'tongue-tied'],
  },
  {
    word: 'Obscure',
    meaning: 'Not discovered or known about; uncertain',
    example: 'The origins of the artifact remain obscure.',
    synonyms: ['unclear', 'unknown', 'vague'],
    antonyms: ['clear', 'obvious'],
  },
  {
    word: 'Vigilant',
    meaning: 'Keeping careful watch for possible danger or difficulties',
    example: 'The guards remained vigilant throughout the night.',
    synonyms: ['watchful', 'alert', 'attentive'],
    antonyms: ['careless', 'negligent'],
  },
  {
    word: 'Lucid',
    meaning: 'Expressed clearly; easy to understand',
    example: 'His explanation was so lucid that everyone understood.',
    synonyms: ['clear', 'intelligible', 'coherent'],
    antonyms: ['confusing', 'ambiguous'],
  },
  {
    word: 'Indolent',
    meaning: 'Wanting to avoid activity or exertion; lazy',
    example: 'The indolent student rarely completed his assignments.',
    synonyms: ['lazy', 'sluggish', 'idle'],
    antonyms: ['energetic', 'industrious'],
  },
  {
    word: 'Sagacious',
    meaning: 'Having or showing keen mental discernment and good judgment',
    example: 'The sagacious leader made wise decisions.',
    synonyms: ['wise', 'shrewd', 'prudent'],
    antonyms: ['foolish', 'ignorant'],
  },
  {
    word: 'Tenacious',
    meaning: 'Tending to keep a firm hold of something; persistent',
    example: 'She was tenacious in her pursuit of the championship.',
    synonyms: ['persistent', 'determined', 'resolute'],
    antonyms: ['weak', 'irresolute'],
  },
  {
    word: 'Ephemeral',
    meaning: 'Lasting for a very short time',
    example: 'The artist’s fame was ephemeral.',
    synonyms: ['transient', 'fleeting', 'short-lived'],
    antonyms: ['enduring', 'permanent'],
  },
  {
    word: 'Meticulous',
    meaning: 'Showing great attention to detail; very careful and precise',
    example: 'He kept meticulous records of every transaction.',
    synonyms: ['careful', 'thorough', 'scrupulous'],
    antonyms: ['careless', 'sloppy'],
  },
  {
    word: 'Apathetic',
    meaning: 'Showing or feeling no interest, enthusiasm, or concern',
    example: 'They were apathetic about the outcome of the election.',
    synonyms: ['indifferent', 'uninterested', 'unconcerned'],
    antonyms: ['enthusiastic', 'interested'],
  },
  {
    word: 'Ambivalent',
    meaning: 'Having mixed feelings or contradictory ideas about something or someone',
    example: 'She felt ambivalent about leaving her hometown.',
    synonyms: ['uncertain', 'unsure', 'conflicted'],
    antonyms: ['certain', 'decided'],
  },
  {
    word: 'Audacious',
    meaning: 'Willing to take bold risks',
    example: 'The scientist was known for his audacious theories.',
    synonyms: ['bold', 'daring', 'brave'],
    antonyms: ['cautious', 'timid'],
  },
  {
    word: 'Trivial',
    meaning: 'Of little value or importance',
    example: 'He ignored the trivial details.',
    synonyms: ['minor', 'insignificant', 'unimportant'],
    antonyms: ['important', 'significant'],
  },
  {
    word: 'Benevolent',
    meaning: 'Well-meaning and kindly',
    example: 'A benevolent smile brightened his face.',
    synonyms: ['kind', 'compassionate', 'generous'],
    antonyms: ['malevolent', 'unkind'],
  },
  {
    word: 'Cacophony',
    meaning: 'A harsh, discordant mixture of sounds',
    example: 'The cacophony from the busy street disturbed her.',
    synonyms: ['discord', 'dissonance', 'clamor'],
    antonyms: ['harmony', 'melody'],
  },
  {
    word: 'Candid',
    meaning: 'Truthful and straightforward; frank',
    example: 'His candid response surprised everyone.',
    synonyms: ['honest', 'open', 'frank'],
    antonyms: ['evasive', 'guarded'],
  },
  {
    word: 'Diligent',
    meaning: 'Having or showing care and conscientiousness in one’s work or duties',
    example: 'She was diligent in her studies.',
    synonyms: ['hardworking', 'industrious', 'dedicated'],
    antonyms: ['lazy', 'indifferent'],
  },
  {
    word: 'Equanimity',
    meaning: 'Mental calmness, composure, and evenness of temper, especially in a difficult situation',
    example: 'He accepted both the good and the bad with equanimity.',
    synonyms: ['composure', 'calmness', 'serenity'],
    antonyms: ['agitation', 'anxiety'],
  },
  {
    word: 'Futile',
    meaning: 'Incapable of producing any useful result; pointless',
    example: 'All efforts to save the plant proved futile.',
    synonyms: ['pointless', 'useless', 'ineffective'],
    antonyms: ['effective', 'useful'],
  },
  {
    word: 'Impeccable',
    meaning: 'Of the highest standards; faultless',
    example: 'Her manners were impeccable.',
    synonyms: ['flawless', 'perfect', 'exemplary'],
    antonyms: ['imperfect', 'flawed'],
  },
  {
    word: 'Inevitable',
    meaning: 'Certain to happen; unavoidable',
    example: 'It is inevitable that prices will rise.',
    synonyms: ['unavoidable', 'inescapable', 'certain'],
    antonyms: ['avoidable', 'uncertain'],
  },
  {
    word: 'Lethargic',
    meaning: 'Affected by lethargy; sluggish and apathetic',
    example: 'He felt lethargic after the long flight.',
    synonyms: ['sluggish', 'inactive', 'drowsy'],
    antonyms: ['energetic', 'active'],
  },
  {
    word: 'Mundane',
    meaning: 'Lacking interest or excitement; dull',
    example: 'She found her daily routine mundane.',
    synonyms: ['ordinary', 'commonplace', 'banal'],
    antonyms: ['extraordinary', 'exciting'],
  },
  {
    word: 'Nostalgia',
    meaning: 'A sentimental longing for the past',
    example: 'He was filled with nostalgia for his childhood.',
    synonyms: ['longing', 'wistfulness', 'yearning'],
    antonyms: ['indifference', 'apathy'],
  },
  {
    word: 'Obsolete',
    meaning: 'No longer produced or used; out of date',
    example: 'Typewriters have become obsolete.',
    synonyms: ['outdated', 'antiquated', 'old-fashioned'],
    antonyms: ['modern', 'current'],
  },
  {
    word: 'Pragmatic',
    meaning: 'Dealing with things sensibly and realistically',
    example: 'She took a pragmatic approach to problem-solving.',
    synonyms: ['practical', 'realistic', 'sensible'],
    antonyms: ['impractical', 'idealistic'],
  },
  {
    word: 'Quintessential',
    meaning: 'Representing the most perfect example of a quality or class',
    example: 'He is a quintessential gentleman.',
    synonyms: ['typical', 'classic', 'model'],
    antonyms: ['atypical', 'uncharacteristic'],
  },
  {
    word: 'Resilient',
    meaning: 'Able to withstand or recover quickly from difficult conditions',
    example: 'Children are often very resilient.',
    synonyms: ['tough', 'flexible', 'strong'],
    antonyms: ['fragile', 'weak'],
  },
  {
    word: 'Scrutinize',
    meaning: 'Examine or inspect closely and thoroughly',
    example: 'The documents were scrutinized by experts.',
    synonyms: ['inspect', 'examine', 'analyze'],
    antonyms: ['ignore', 'overlook'],
  },
  {
    word: 'Transient',
    meaning: 'Lasting only for a short time; impermanent',
    example: 'The beauty of the sunset was transient.',
    synonyms: ['temporary', 'fleeting', 'momentary'],
    antonyms: ['permanent', 'lasting'],
  },
  {
    word: 'Ubiquitous',
    meaning: 'Present, appearing, or found everywhere',
    example: 'Smartphones have become ubiquitous.',
    synonyms: ['omnipresent', 'pervasive', 'universal'],
    antonyms: ['rare', 'scarce'],
  },
  {
    word: 'Versatile',
    meaning: 'Able to adapt or be adapted to many different functions or activities',
    example: 'He is a versatile musician.',
    synonyms: ['adaptable', 'flexible', 'resourceful'],
    antonyms: ['limited', 'inflexible'],
  },
  {
    word: 'Wary',
    meaning: 'Feeling or showing caution about possible dangers or problems',
    example: 'They were wary of the proposal.',
    synonyms: ['cautious', 'careful', 'alert'],
    antonyms: ['reckless', 'careless'],
  },
  {
    word: 'Zealous',
    meaning: 'Having or showing zeal',
    example: 'She was zealous in promoting her ideas.',
    synonyms: ['enthusiastic', 'passionate', 'fervent'],
    antonyms: ['apathetic', 'indifferent'],
  },
  {
    word: 'Alleviate',
    meaning: 'To make suffering, deficiency, or a problem less severe',
    example: 'The medicine helped alleviate her pain.',
    synonyms: ['ease', 'relieve', 'lessen'],
    antonyms: ['aggravate', 'worsen'],
  },
  {
    word: 'Belligerent',
    meaning: 'Hostile and aggressive',
    example: 'His belligerent attitude caused conflicts.',
    synonyms: ['hostile', 'aggressive', 'combative'],
    antonyms: ['peaceful', 'friendly'],
  },
  {
    word: 'Complacent',
    meaning: 'Showing smug or uncritical satisfaction with oneself or one’s achievements',
    example: 'He grew complacent after his first success.',
    synonyms: ['self-satisfied', 'smug', 'unconcerned'],
    antonyms: ['concerned', 'dissatisfied'],
  },
  {
    word: 'Debilitate',
    meaning: 'To make someone weak and infirm',
    example: 'The illness debilitated him.',
    synonyms: ['weaken', 'enfeeble', 'incapacitate'],
    antonyms: ['strengthen', 'invigorate'],
  },
  {
    word: 'Eclectic',
    meaning: 'Deriving ideas, style, or taste from a diverse range of sources',
    example: 'Her musical tastes are eclectic.',
    synonyms: ['diverse', 'varied', 'wide-ranging'],
    antonyms: ['narrow', 'specific'],
  },
  {
    word: 'Formidable',
    meaning: 'Inspiring fear or respect through being impressively large, powerful, or capable',
    example: 'He faced a formidable opponent.',
    synonyms: ['daunting', 'intimidating', 'powerful'],
    antonyms: ['weak', 'unimpressive'],
  },
  {
    word: 'Gregarious',
    meaning: 'Fond of company; sociable',
    example: 'She is a gregarious and outgoing person.',
    synonyms: ['sociable', 'outgoing', 'friendly'],
    antonyms: ['reserved', 'unsociable'],
  },
  {
    word: 'Hiatus',
    meaning: 'A pause or break in continuity',
    example: 'The band is on a hiatus.',
    synonyms: ['pause', 'break', 'interruption'],
    antonyms: ['continuation', 'persistence'],
  },
  {
    word: 'Imminent',
    meaning: 'About to happen',
    example: 'A storm is imminent.',
    synonyms: ['impending', 'approaching', 'forthcoming'],
    antonyms: ['distant', 'remote'],
  },
  {
    word: 'Jubilant',
    meaning: 'Feeling or expressing great happiness and triumph',
    example: 'The team was jubilant after the victory.',
    synonyms: ['joyful', 'elated', 'exultant'],
    antonyms: ['dejected', 'sad'],
  },
  {
    word: 'Kindle',
    meaning: 'To light or set on fire; to arouse an emotion or feeling',
    example: 'The speech kindled hope in the listeners.',
    synonyms: ['ignite', 'arouse', 'inspire'],
    antonyms: ['extinguish', 'dampen'],
  },
  {
    word: 'Lament',
    meaning: 'To mourn or express sorrow',
    example: 'She lamented the loss of her friend.',
    synonyms: ['mourn', 'grieve', 'bewail'],
    antonyms: ['celebrate', 'rejoice'],
  },
  {
    word: 'Malleable',
    meaning: 'Easily influenced; pliable',
    example: 'Young children are highly malleable.',
    synonyms: ['flexible', 'pliable', 'adaptable'],
    antonyms: ['rigid', 'inflexible'],
  },
  {
    word: 'Nefarious',
    meaning: 'Wicked or criminal',
    example: 'They plotted a nefarious scheme.',
    synonyms: ['evil', 'villainous', 'heinous'],
    antonyms: ['virtuous', 'honorable'],
  },
  {
    word: 'Obstinate',
    meaning: 'Stubbornly refusing to change one’s opinion or chosen course of action',
    example: 'He remained obstinate despite their arguments.',
    synonyms: ['stubborn', 'unyielding', 'inflexible'],
    antonyms: ['compliant', 'yielding'],
  },
  {
    word: 'Plausible',
    meaning: 'Seeming reasonable or probable',
    example: 'Your explanation is plausible.',
    synonyms: ['believable', 'credible', 'likely'],
    antonyms: ['implausible', 'unbelievable'],
  },
  {
    word: 'Quell',
    meaning: 'To put an end to, typically by use of force',
    example: 'The police quelled the riot.',
    synonyms: ['suppress', 'subdue', 'quash'],
    antonyms: ['encourage', 'provoke'],
  },
  {
    word: 'Revere',
    meaning: 'Feel deep respect or admiration for',
    example: 'Students revere their inspiring teacher.',
    synonyms: ['admire', 'respect', 'honor'],
    antonyms: ['disdain', 'despise'],
  },
  {
    word: 'Superfluous',
    meaning: 'Unnecessary, especially through being more than enough',
    example: 'His speech was filled with superfluous details.',
    synonyms: ['excess', 'unneeded', 'redundant'],
    antonyms: ['necessary', 'essential'],
  },
  {
    word: 'Tangible',
    meaning: 'Perceptible by touch; clear and definite',
    example: 'We need tangible evidence.',
    synonyms: ['palpable', 'concrete', 'real'],
    antonyms: ['intangible', 'abstract'],
  },
  {
    word: 'Unanimous',
    meaning: 'Fully in agreement',
    example: 'The committee reached a unanimous decision.',
    synonyms: ['undivided', 'unified', 'concordant'],
    antonyms: ['divided', 'disputed'],
  },
  {
    word: 'Voracious',
    meaning: 'Having a very eager approach to an activity',
    example: 'He is a voracious reader.',
    synonyms: ['insatiable', 'avid', 'eager'],
    antonyms: ['apathetic', 'indifferent'],
  },
  {
    word: 'Whimsical',
    meaning: 'Playfully quaint or fanciful; unpredictable',
    example: 'Her whimsical artwork delights viewers.',
    synonyms: ['playful', 'quirky', 'fanciful'],
    antonyms: ['serious', 'sober'],
  },
  {
    word: 'Yearn',
    meaning: 'Have an intense feeling of longing for something',
    example: 'She yearned for her family.',
    synonyms: ['long', 'desire', 'crave'],
    antonyms: ['dislike', 'abjure'],
  },
  {
    word: 'Zany',
    meaning: 'Amusingly unconventional and idiosyncratic',
    example: 'His zany humor made everyone laugh.',
    synonyms: ['eccentric', 'quirky', 'funny'],
    antonyms: ['serious', 'conventional'],
  },
  {
    word: 'Admonish',
    meaning: 'Warn or reprimand someone firmly',
    example: 'The teacher admonished the student for being late.',
    synonyms: ['reprimand', 'scold', 'warn'],
    antonyms: ['praise', 'commend'],
  },
  {
    word: 'Banal',
    meaning: 'So lacking in originality as to be obvious and boring',
    example: 'His remarks were banal.',
    synonyms: ['trite', 'unoriginal', 'commonplace'],
    antonyms: ['original', 'unique'],
  },
  {
    word: 'Capricious',
    meaning: 'Given to sudden and unaccountable changes of mood or behavior',
    example: 'He is a capricious boss.',
    synonyms: ['unpredictable', 'impulsive', 'fickle'],
    antonyms: ['consistent', 'steady'],
  },
  {
    word: 'Deference',
    meaning: 'Polite submission and respect',
    example: 'They bowed in deference to the king.',
    synonyms: ['respect', 'regard', 'esteem'],
    antonyms: ['disrespect', 'defiance'],
  },
  {
    word: 'Ebullient',
    meaning: 'Cheerful and full of energy',
    example: 'Her ebullient personality lifted the team’s spirit.',
    synonyms: ['exuberant', 'lively', 'enthusiastic'],
    antonyms: ['depressed', 'unenthusiastic'],
  },
  {
    word: 'Facilitate',
    meaning: 'Make an action or process easy or easier',
    example: 'Technology facilitates communication.',
    synonyms: ['ease', 'help', 'assist'],
    antonyms: ['hinder', 'impede'],
  },
  {
    word: 'Guile',
    meaning: 'Sly or cunning intelligence',
    example: 'He used guile to win the game.',
    synonyms: ['cunning', 'craft', 'slyness'],
    antonyms: ['honesty', 'candor'],
  },
  {
    word: 'Harbinger',
    meaning: 'A person or thing that announces or signals the approach of another',
    example: 'The dark clouds were a harbinger of the storm.',
    synonyms: ['omen', 'sign', 'forerunner'],
    antonyms: ['result', 'effect'],
  }
//added 70+
  // ...add many more words for a real app
];

function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function VocabularyBuilder() {
  const navigate = useNavigate();
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setWords(shuffleArray(vocabularyWords));
    setCurrentIndex(0);
    setShowDetails(false);
  }, []);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowDetails(false);
    } else {
      setWords(shuffleArray(vocabularyWords));
      setCurrentIndex(0);
      setShowDetails(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowDetails(false);
    }
  };

  const currentWord = words[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center overflow-hidden relative bg-gradient-to-br from-emerald-50/60 via-teal-50/60 to-emerald-100/40 dark:from-black/80 dark:via-black/90 dark:to-black/80">
      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-2xl mx-auto mt-6 mb-8 px-4">
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/20 dark:border-white/10 hover:bg-white/30 dark:hover:bg-black/30 text-gray-800 dark:text-white transition-all duration-300"
        >
          &larr; Home
        </button>
        <span className="font-medium text-gray-700 dark:text-gray-300">
          Word {currentIndex + 1}/{words.length}
        </span>
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl p-6 sm:p-10 relative rounded-[2.5rem] overflow-hidden shadow-2xl"
        style={{
          background: 'linear-gradient(120deg, rgba(255,255,255,0.18) 60%, rgba(255,255,255,0.10) 100%)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1.5px solid rgba(255,255,255,0.18)',
          boxShadow: '0 8px 40px 0 rgba(0,0,0,0.18), 0 0 0 1.5px rgba(255,255,255,0.10) inset',
        }}
      >
        {/* Liquid glass highlight overlay */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 rounded-t-[2.5rem] blur-[10px] opacity-40" style={{ WebkitMaskImage: 'linear-gradient(to bottom, white 60%, transparent 100%)' }} />
          <div className="absolute bottom-0 right-0 w-2/3 h-1/3 bg-white/10 rounded-b-[2.5rem] blur-[12px] opacity-20" style={{ WebkitMaskImage: 'linear-gradient(to top, white 60%, transparent 100%)' }} />
          <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-20" style={{ boxShadow: '0 0 32px 8px rgba(0,0,0,0.10) inset, 0 0 0 2px rgba(255,255,255,0.10) inset' }} />
        </div>
        {currentWord && (
          <div className="space-y-8 relative z-20">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-emerald-800 dark:text-emerald-200 mb-2 drop-shadow">
                {currentWord.word}
              </h2>
              <button
                onClick={() => setShowDetails((v) => !v)}
                className="mt-2 px-4 py-2 rounded-lg bg-emerald-500 text-white font-semibold shadow hover:bg-emerald-600 transition-all duration-300"
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
            </div>
            {showDetails && (
              <div className="space-y-4 text-lg">
                <div>
                  <span className="font-bold text-emerald-700 dark:text-emerald-200">Meaning:</span> {currentWord.meaning}
                </div>
                <div>
                  <span className="font-bold text-emerald-700 dark:text-emerald-200">Example:</span> <span className="italic">{currentWord.example}</span>
                </div>
                <div>
                  <span className="font-bold text-emerald-700 dark:text-emerald-200">Synonyms:</span> {currentWord.synonyms.join(', ')}
                </div>
                <div>
                  <span className="font-bold text-emerald-700 dark:text-emerald-200">Antonyms:</span> {currentWord.antonyms.join(', ')}
                </div>
              </div>
            )}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-5 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-5 py-2 rounded-lg bg-emerald-500 text-white font-semibold shadow hover:bg-emerald-600 transition-all duration-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
