type RowObj = {
  name: string[];
  date: string;
  duration: string;
  enrolled: number;
  published: boolean;
  actions: string;
};

const tableDataCourseOverview: RowObj[] = [
  {
    name: [
      'Corso ',
      'https://i.ibb.co/zPxBHYv/241143773-8212166459343985239-7834018950652403662-n-1.jpg',
    ],
    date: 'Oct 24, 2022',
    duration: '1h 30m',
    enrolled: 5,
    published: true,
    actions: '#',
  },
  {
    name: [
      'Corso 2',
      'https://i.ibb.co/5r8xc6T/218987537-368849674583041-6903848186366518125-n.jpg',
    ],
    date: 'Nov 17, 2019',
    duration: '1h 30m',
    enrolled: 5,
    published: true,
    actions: '#',
  },
  {
    name: ['Corse 3', 'https://i.ibb.co/7p0d1Cd/Frame-24.png'],
    date: 'Jan 30, 2021',
    duration: '1h 30m',
    enrolled: 5,
    published: false,
    actions: '#',
  },
  {
    name: [
      'Corso 4',
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80',
    ],
    date: 'Aug 02, 2021',
    duration: '1h 30m',
    enrolled: 5,
    published: false,
    actions: '#',
  },
  {
    name: [
      'Corso 5',
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80',
    ],
    date: 'Apr 19, 2021',
    duration: '1h 30m',
    enrolled: 5,
    published: false,
    actions: '#',
  },
  {
    name: ['Corso 6', 'https://i.ibb.co/7p0d1Cd/Frame-24.png'],
    date: 'Sep 12, 2021',
    duration: '1h 30m',
    enrolled: 5,
    published: true,
    actions: '#',
  },
  {
    name: ['Corso 7', 'https://i.ibb.co/NSJYQYD/Horizon-UI-Avatar.png'],
    date: 'Apr 18, 2022',
    duration: '1h 30m',
    enrolled: 5,
    published: true,
    actions: '#',
  },
  {
    name: [
      'Corso 7',
      'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80',
    ],
    date: 'Jul 20, 2020',
    duration: '1h 30m',
    enrolled: 5,
    published: true,
    actions: '#',
  },
  {
    name: [
      'Corso 8',
      'https://images.unsplash.com/photo-1573766064535-6d5d4e62bf9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80',
    ],
    date: 'Sep 30, 2021',
    duration: '1h 30m',
    enrolled: 5,
    published: true,
    actions: '#',
  },
];

export default tableDataCourseOverview;
