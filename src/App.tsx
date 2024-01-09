import ParamEditor, { IParam } from './ParamEditor/ParamEditor'

const params: IParam[] = [
  {
    id: 1,
    name: 'Назначение',
    type: 'string',
  },
  {
    id: 2,
    name: 'Длина',
    type: 'string',
  },
]

const model = {
  paramValues: [
    {
      paramId: 1,
      value: 'повседневное',
    },
    {
      paramId: 2,
      value: 'макси',
    },
  ],
}

function App() {
  return <ParamEditor params={params} model={model} />
}

export default App
