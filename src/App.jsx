import { useState } from 'react'
import { BrowserRouter, Routes, Route, useRoutes, Link, Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom";
import './App.css';

function Menu() {
  const navigate = useNavigate()
  return (
    <div className='menu'>
      <Link to="/">Home</Link>
      <i>|</i>
      <Link to="/one">One</Link>
      <i>|</i>
      <Link to="/one/two">Two</Link>
      <i>|</i>
      <Link to="/one/two/three/333">Three</Link>

      <div className='menu-btns'>
        <button onClick={() => navigate('/one/two?q=222')}>two?q=222</button>
        <button onClick={() => navigate('/one/two')}>go Two</button>
      </div>
    </div>
  )
}

function Layout() {
  return (
    <div className='layout'>
      <p>layout:</p>
      <Outlet />
    </div>
  )
}

const Home = () => {
  return <div className='home'>- home -</div>
}

function One() {
  return (
    <div className='one'>
      <p>- one -</p>
      <Outlet />
    </div>
  )
}

function Two() {
  const [params] = useSearchParams()
  const q = params.get('q')
  return (
    <div className='two'>
      <p>- two - {q || null}</p>
      <Outlet />
    </div>
  )
}

function Three() {
  const params = useParams()
  return (
    <div className='three'>
      <p>- three - {params.id || null}</p>

      {/* <Outlet /> */}
    </div>
  )
}

// 集中式路由配置
// 1. 准备一个路由数组 数组中定义所有的路由对应关系
const routesList = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <Home />,
        index: true, // index设置为true 变成默认的二级路由
      },
      {
        path: 'one',
        element: <One />,
        children: [
          {
            path: 'two',
            element: <Two />,
            children: [
              {
                path: 'three/:id',
                element: <Three />
              }
            ]
          }
        ]
      }
    ]
  }
]
// 2. 使用useRoutes方法传入routesList生成Routes组件
function WrapperRoutes() {
  const element = useRoutes(routesList)
  return element
}
// 3. 替换之前的Routes组件

function App1() {
  return (
    <div className="App">
      <header>嵌套路由</header>
      <BrowserRouter>
        {/* <Link> 需要放到 BrowserRouter 内 */}
        <Menu />
        {/* <Routes> 和 Route 只能写到这里，貌似是 */}
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path='one' element={<One />}>
              <Route path='two' element={<Two />}>
                {/* 'three/:id' 路径须包括id, 否则不能匹配到 */}
                <Route path='three/:id' element={<Three />}></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function App2() {
  return (
    <div className="App">
      <header>集中式路由配置</header>
      <BrowserRouter>
        <Menu />
        {/* 3. 替换之前的Routes组件 */}
        <WrapperRoutes />
      </BrowserRouter>
    </div>
  )
}

export default App2
