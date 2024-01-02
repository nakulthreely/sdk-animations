import './App.css'
//import Application from './components'
//import Application from '@tria-sdk/authenticate'
import Application from './components/index2'
function App() {
  return (
    <div style={{width:0, height:0, top:0, left:0, position:"fixed",zIndex: 9999}}>
      <Application
        logo='https://www.empireofsight.com/assets/images/logo-icon.svg'
        dappName='Empire of Sight'
        dappDomain={window.parent.origin}
        primaryColor='#9A86FF'
        defaultChain='FUSE'
        supportedChains={['FUSE', 'POLYGON']}
      />
    </div>
  )
}

export default App
