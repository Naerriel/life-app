const skill = {
  Communication: 'Communication',
  Leadership: 'Leadership',

  CriticalThinking: 'Critical thinking',
  CreativeThinking: 'Creative thinking',
  Learning: 'Learning',

  SelfManagement: 'Self-management',
  Resilience: 'Resilience',

  Strength: 'Strength',
  Endurance: 'Endurance',
  Flexibility: 'Flexibility',
  Health: 'Health',
};

const skillsConsts = {
  [skill.Communication]: {
    position: 0,
  },
  [skill.Leadership]: {
    position: 1,
  },
  [skill.CriticalThinking]: {
    position: 2,
  },
  [skill.CreativeThinking]: {
    position: 3,
  },
  [skill.Learning]: {
    position: 4,
  },
  [skill.SelfManagement]: {
    position: 5,
  },
  [skill.Resilience]: {
    position: 6,
  },
  [skill.Strength]: {
    position: 7,
  },
  [skill.Endurance]: {
    position: 8,
  },
  [skill.Flexibility]: {
    position: 9,
  },
  [skill.Health]: {
    position: 10,
  },
};

const skillsGroups = [
  {
    name: 'social',
    skills: [
      'Communication',
      'Leadership',
    ],
  }, {
    name: 'mind',
    skills: [
      'Critical thinking',
      'Creative thinking',
      'Learning',
    ],
  }, {
    name: 'self',
    skills: [
      'Self-management',
      'Resilience'
    ],
  }, {
    name: 'body',
    skills: [
      'Strength',
      'Endurance',
      'Flexibility',
      'Health'
    ],
  }];
