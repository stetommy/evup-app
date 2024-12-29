import { Icon } from '@chakra-ui/react';
import {
  MdEvent,
} from 'react-icons/md';
// import { useSelector } from 'react-redux';

/** Auth Imports */
import { IRoute } from 'types/navigation';

// const { user } = useSelector((state: any) => state.auth);

export const routes: IRoute[] = [
  /** --- Dashboards --- */
  {
    name: 'Eventi',
    layout: '/user',
    path: '/dashboard',
    icon: <Icon as={MdEvent} width='20px' height='20px' color='inherit' />,
    collapse: false,
  },
  /** --- Instructor --- */
  // {
  //   name: 'Istruttore',
  //   layout: '/user',
  //   path: '/instructor',
  //   icon: <Icon as={MdClass} width='20px' height='20px' color='inherit' />,
  //   collapse: false,
  // },
  // {
  //   name: 'User',
  //   layout: '/user',
  //   path: '/user',
  //   icon: <Icon as={MdClass} width='20px' height='20px' color='inherit' />,
  //   collapse: false,
  // },
  /** --- Courses --- */
  // {
  //   name: 'Corsi',
  //   layout: '/user',
  //   path: '/course/all-courses',
  //   icon: <Icon as={MdPlayLesson} width='20px' height='20px' color='inherit' />,
  //   collapse: false,
  // },
  /** --- Auth page --- */
  // {
  //   name: 'Auth',
  //   path: '/auth',
  //   icon: (
  //     <Icon
  //       as={MdOutlineSettingsInputComposite}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   collapse: true,
  //   items: [
  //     {
  //       name: 'forgot password',
  //       layout: '/auth',
  //       path: '/forgot-password',
  //       secondary: true,
  //     },
  //     {
  //       name: 'pricing',
  //       layout: '/auth',
  //       path: '/pricing',
  //       secondary: true,
  //     },
  //     {
  //       name: 'sign in',
  //       layout: '/auth',
  //       path: '/sign-in',
  //       secondary: true,
  //     },
  //     {
  //       name: 'sign up',
  //       layout: '/auth',
  //       path: '/sign-up',
  //       secondary: true,
  //     },
  //   ],
  // },
  /** --- Sample Pages --- */
  // {
  //   name: 'SAMPLE PAGES',
  //   path: '/user',
  //   icon: (
  //     <Icon
  //       as={MdOutlineSettingsInputComposite}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   collapse: true,
  //   items: [
  //     {
  //       name: 'course',
  //       path: '/course',
  //       collapse: true,
  //       items: [
  //         {
  //           name: 'all course',
  //           layout: '/user',
  //           path: '/course/all-courses',
  //         },
  //         {
  //           name: 'single course',
  //           layout: '/user',
  //           path: '/course/course-page',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'instructor',
  //       path: '/instructor',
  //       collapse: true,
  //       items: [
  //         {
  //           name: 'new course',
  //           layout: '/user',
  //           path: '/instructor/new-course',
  //         },
  //         {
  //           name: 'edit course',
  //           layout: '/user',
  //           path: '/instructor/edit-course',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'stripe success',
  //       path: '/invoice',
  //       layout: '/user',
  //       collapse: false,
  //     },
  //     {
  //       name: 'user profile',
  //       path: '/profile',
  //       collapse: true,
  //       items: [
  //         {
  //           name: 'overview',
  //           layout: '/user',
  //           path: '/profile/overview',
  //         },
  //         {
  //           name: 'settings',
  //           layout: '/user',
  //           path: '/profile/settings',
  //         },
  //         {
  //           name: 'settings 2',
  //           layout: '/user',
  //           path: '/profile/settings2',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'others',
  //       path: '/user/notifications',
  //       collapse: true,
  //       items: [
  //         {
  //           name: 'notifications',
  //           layout: '/user',
  //           path: '/notifications',
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const Userroutes: IRoute[] = [
  /** --- Dashboards --- */
  {
    name: 'Eventi',
    layout: '/user',
    path: '/dashboard',
    icon: <Icon as={MdEvent} width='20px' height='20px' color='inherit' />,
    collapse: false,
  },
  
  
  /** --- Instructor --- */
  // {
  //   name: 'Istruttore',
  //   layout: '/user',
  //   path: '/instructor',
  //   icon: <Icon as={MdClass} width='20px' height='20px' color='inherit' />,
  //   collapse: false,
  // },
  // {
  //   name: 'User',
  //   layout: '/user',
  //   path: '/user',
  //   icon: <Icon as={MdClass} width='20px' height='20px' color='inherit' />,
  //   collapse: false,
  // },
  /** --- Courses --- */
  // {
  //   name: 'Corsi',
  //   layout: '/user',
  //   path: '/course/all-courses',
  //   icon: <Icon as={MdPlayLesson} width='20px' height='20px' color='inherit' />,
  //   collapse: false,
  // },
  /** --- Auth page --- */
  // {
  //   name: 'Auth',
  //   path: '/auth',
  //   icon: (
  //     <Icon
  //       as={MdOutlineSettingsInputComposite}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   collapse: true,
  //   items: [
  //     {
  //       name: 'forgot password',
  //       layout: '/auth',
  //       path: '/forgot-password',
  //       secondary: true,
  //     },
  //     {
  //       name: 'pricing',
  //       layout: '/auth',
  //       path: '/pricing',
  //       secondary: true,
  //     },
  //     {
  //       name: 'sign in',
  //       layout: '/auth',
  //       path: '/sign-in',
  //       secondary: true,
  //     },
  //     {
  //       name: 'sign up',
  //       layout: '/auth',
  //       path: '/sign-up',
  //       secondary: true,
  //     },
  //   ],
  // },
  /** --- Sample Pages --- */
  // {
  //   name: 'SAMPLE PAGES',
  //   path: '/user',
  //   icon: (
  //     <Icon
  //       as={MdOutlineSettingsInputComposite}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   collapse: true,
  //   items: [
  //     {
  //       name: 'course',
  //       path: '/course',
  //       collapse: true,
  //       items: [
  //         {
  //           name: 'all course',
  //           layout: '/user',
  //           path: '/course/all-courses',
  //         },
  //         {
  //           name: 'single course',
  //           layout: '/user',
  //           path: '/course/course-page',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'instructor',
  //       path: '/instructor',
  //       collapse: true,
  //       items: [
  //         {
  //           name: 'new course',
  //           layout: '/user',
  //           path: '/instructor/new-course',
  //         },
  //         {
  //           name: 'edit course',
  //           layout: '/user',
  //           path: '/instructor/edit-course',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'stripe success',
  //       path: '/invoice',
  //       layout: '/user',
  //       collapse: false,
  //     },
  //     {
  //       name: 'user profile',
  //       path: '/profile',
  //       collapse: true,
  //       items: [
  //         {
  //           name: 'overview',
  //           layout: '/user',
  //           path: '/profile/overview',
  //         },
  //         {
  //           name: 'settings',
  //           layout: '/user',
  //           path: '/profile/settings',
  //         },
  //         {
  //           name: 'settings 2',
  //           layout: '/user',
  //           path: '/profile/settings2',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'others',
  //       path: '/user/notifications',
  //       collapse: true,
  //       items: [
  //         {
  //           name: 'notifications',
  //           layout: '/user',
  //           path: '/notifications',
  //         },
  //       ],
  //     },
  //   ],
  // },
];

 export default routes;
