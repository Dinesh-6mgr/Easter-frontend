import { isSameDay } from 'date-fns';

const getEasterDates = (year) => ({
  palmSunday:     new Date(year, 2, 29), // March 29
  maundyThursday: new Date(year, 3, 2),  // April 2
  goodFriday:     new Date(year, 3, 3),  // April 3
  holySaturday:   new Date(year, 3, 4),  // April 4
  easterSunday:   new Date(year, 3, 5),  // April 5
});

export const getCurrentEasterMessage = () => {
  const today = new Date();
  const dates = getEasterDates(today.getFullYear());

  const events = [
    { date: dates.palmSunday,     message: '🌿 Hosanna! Blessed is He who comes in the name of the Lord. Welcome to Passion of the Week 2082!', color: 'from-green-400 to-yellow-400' },
    { date: dates.maundyThursday, message: '🍞 A new commandment I give to you: love one another as I have loved you.', color: 'from-blue-400 to-purple-400' },
    { date: dates.goodFriday,     message: '✝️ It is finished. A time for reflection and gratitude for the ultimate sacrifice.', color: 'from-gray-800 to-red-900' },
    { date: dates.holySaturday,   message: '🕯️ In the silence, we wait. The tomb is sealed, but hope remains.', color: 'from-gray-700 to-purple-900' },
    { date: dates.easterSunday,   message: '🌅 HE IS RISEN! Indeed, He is risen! Celebrate the victory over death!', color: 'from-yellow-400 to-pink-500' }
  ];

  for (const event of events) {
    if (isSameDay(today, event.date)) return event;
  }

  // Holy Week range fallback (March 29 – April 5)
  const m = today.getMonth();
  const d = today.getDate();
  const isHolyWeek = (m === 2 && d >= 29) || (m === 3 && d <= 5);
  if (isHolyWeek) return events[0]; // Palm Sunday greeting during whole week

  return {
    message: '🕊️ Prepare your heart for the Easter celebration. Join our egg hunt and learn about the journey!',
    color: 'from-purple-400 to-pink-400'
  };
};

export const timelineEvents = [
  { id: 1, day: 'Palm Sunday',     date: 'Sunday before Easter',  description: "Jesus enters Jerusalem as the people wave palm branches, shouting \"Hosanna!\"",                icon: '🌿', color: 'emerald', verse: 'Matthew 21:1-11' },
  { id: 2, day: 'Maundy Thursday', date: 'Thursday before Easter', description: "The Last Supper — Jesus shares bread and wine, washing the disciples' feet.",                   icon: '🍞', color: 'blue',    verse: 'John 13:1-17'   },
  { id: 3, day: 'Good Friday',     date: 'Friday before Easter',   description: "Jesus is crucified on the cross, sacrificing Himself for humanity's sins.",                      icon: '✝️', color: 'red',     verse: 'John 19:17-30'  },
  { id: 4, day: 'Holy Saturday',   date: 'Day before Easter',      description: 'A day of waiting and reflection as Jesus lies in the tomb.',                                     icon: '🕯️', color: 'gray',    verse: 'Luke 23:50-56'  },
  { id: 5, day: 'Easter Sunday',   date: 'Resurrection Day',       description: 'The tomb is empty! Jesus rises from the dead, conquering death forever.',                        icon: '🌅', color: 'yellow',  verse: 'Matthew 28:1-10'}
];
