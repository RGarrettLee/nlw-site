export default function Colours() {
   const colours = {
      'Beginner Tier': 'bg-beginner',
      'Easy Tier': 'bg-easy',
      'Medium Tier': 'bg-medium',
      'Hard Tier': 'bg-hard',
      'Very Hard Tier': 'bg-veryhard',
      'Insane Tier': 'bg-insane',
      'Extreme Tier': 'bg-extreme',
      'Remorseless Tier': 'bg-remorseless',
      'Relentless Tier': 'bg-relentless',
      'Terrifying Tier': 'bg-terrifying',
      'Catastrophic Tier': 'bg-catastrophic',
      'Fuck': 'bg-fuck',
   }

   const hover = {
      'Beginner Tier': 'hover:bg-beginner/80',
      'Easy Tier': 'hover:bg-easy/80',
      'Medium Tier': 'hover:bg-medium/80',
      'Hard Tier': 'hover:bg-hard/80',
      'Very Hard Tier': 'hover:bg-veryhard/80',
      'Insane Tier': 'hover:bg-insane/80',
      'Extreme Tier': 'hover:bg-extreme/80',
      'Remorseless Tier': 'hover:bg-remorseless/80',
      'Relentless Tier': 'hover:bg-relentless/80',
      'Terrifying Tier': 'hover:bg-terrifying/80',
      'Catastrophic Tier': 'hover:bg-catastrophic/80',
      'Fuck': 'bg-fuck',
   }

   const active = {
      'Beginner Tier': 'active:bg-beginner/60',
      'Easy Tier': 'active:bg-easy/60',
      'Medium Tier': 'active:bg-medium/60',
      'Hard Tier': 'active:bg-hard/60',
      'Very Hard Tier': 'active:bg-veryhard/60',
      'Insane Tier': 'active:bg-insane/60',
      'Extreme Tier': 'active:bg-extreme/60',
      'Remorseless Tier': 'active:bg-remorseless/60',
      'Relentless Tier': 'active:bg-relentless/60',
      'Terrifying Tier': 'active:bg-terrifying/60',
      'Catastrophic Tier': 'active:bg-catastrophic/60',
      'Fuck': 'bg-fuck',
   }

   return { colours, hover, active };
}