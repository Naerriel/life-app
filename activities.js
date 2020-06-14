const activity = {
  Recreation: 'Recreation',
  Waste: 'Waste',

  Friends: 'Friends',
  Dating: 'Dating',

  Work: 'Work',
  SideProject: 'Side-project',
  Learning: 'Learning',
  Artistic: 'Artistic',

  SelfManagement: 'Self-management',
  Prepparing: 'Prepparing',

  Strength: 'Strength',
  Endurance: 'Endurance',
  Flexibility: 'Flexibility',
  Health: 'Health',
  Sleep: 'Sleep',
};

const activities = {
  [activity.Recreation]: {
    id: 1,
    color: '#999999',
    skillExp: [],
  },
  [activity.Waste]: {
    id: 2,
    color: '#d9d9d9',
    skillExp: [],
  },
  [activity.Friends]: {
    id: 11,
    color: '#37761d',
    skillExp: [{
      name: skill.Communication,
      multiplier: 1,
    }],
  },
  [activity.Dating]: {
    id: 12,
    color: '#6ba84f',
    skillExp: [{
      name: skill.Communication,
      multiplier: 1,
    }],
  },
  [activity.Work]: {
    id: 21,
    color: '#1355cc',
    skillExp: [{
      name: skill.CriticalThinking,
      multiplier: 1,
    }],
  },
  [activity.SideProject]: {
    id: 22,
    color: '#3c78d9',
    skillExp: [{
      name: skill.CriticalThinking,
      multiplier: 1,
    }],
  },
  [activity.Learning]: {
    id: 23,
    color: '#6e9eeb',
    skillExp: [{
      name: skill.CreativeThinking,
      multiplier: 0.5,
    }, {
      name: skill.CriticalThinking,
      multiplier: 0.5,
    }],
  },
  [activity.Artistic]: {
    id: 24,
    color: '#a4c2f4',
    skillExp: [{
      name: skill.CreativeThinking,
      multiplier: 1,
    }],
  },
  [activity.SelfManagement]: {
    id: 31,
    color: '#f0c233',
    skillExp: [{
      name: skill.SelfManagement,
      multiplier: 1,
    }],
  },
  [activity.Prepparing]: {
    id: 32,
    color: '#ffe599',
    skillExp: [],
  },
  [activity.Strength]: {
    id: 41,
    color: '#cc0202',
    skillExp: [{
      name: skill.Strength,
      multiplier: 1,
    }],
  },
  [activity.Endurance]: {
    id: 42,
    color: '#e06666',
    skillExp: [{
      name: skill.Endurance,
      multiplier: 1,
    }],
  },
  [activity.Flexibility]: {
    id: 43,
    color: '#ea9999',
    skillExp: [{
      name: skill.Flexibility,
      multiplier: 1,
    }],
  },
  [activity.Health]: {
    id: 44,
    color: '#f4cccc',
    skillExp: [{
      name: skill.Health,
      multiplier: 1,
    }],
  },
  [activity.Sleep]: {
    id: 45,
    color: '#e6b8af',
    skillExp: [],
  },
};

const activityIdToName = {
  1: activity.Recreation,
  2: activity.Waste,
  11: activity.Friends,
  12: activity.Dating,
  21: activity.Work,
  22: activity.SideProject,
  23: activity.Learning,
  24: activity.Artistic,
  31: activity.SelfManagement,
  32: activity.Prepparing,
  41: activity.Strength,
  42: activity.Endurance,
  43: activity.Flexibility,
  44: activity.Health,
  45: activity.Sleep,
};
