import { MagnetBold, MagnetMedium } from '@/pages/_app'
import ProfileSection from './components/Profile'
import SideBar from './components/Sidebar'
import NotificationSection from './components/Notifications/index';
import AccountSupportSection from './components/AccountSupport/index';

const SettingsComponent = () => {
  return (
    <div className='w-[90%]'>
      <div className='mt-[3rem]'>
        <p className={`text-[40px] ${MagnetBold.className} h-[3rem] leading-[41px] text-[#000000]`}>Settings</p>
      </div>
      <div className='min-h-[100vh] gap-[1rem] mt-[32px] flex'>
        <SideBar/>
        <div className='w-[calc(100%-21vw)]'>
          <ProfileSection/>
          <NotificationSection/>
          <AccountSupportSection/>
        </div>
      </div>
    </div>
  )
}

export default SettingsComponent