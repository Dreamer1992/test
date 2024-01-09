import { useState, useEffect, useCallback, memo } from 'react'

import styles from './ParamEditor.module.scss'

export interface IParam {
  id: number
  name: string
  type: 'string'
}

interface IParamValue {
  paramId: number
  value: string
}

interface IModel {
  paramValues: IParamValue[]
}

interface IProps {
  params: IParam[]
  model: IModel
}

const ParamInput = memo(
  ({
    param,
    value,
    onChange,
  }: {
    param: IParam
    value: string
    onChange: (paramId: number, value: string) => void
  }) => (
    <div className={styles.paramInputContainer}>
      <label htmlFor={`${param.id}`} className={styles.label}>
        {param.name}:
      </label>

      <input
        id={`${param.id}`}
        type="text"
        value={value}
        onChange={(e) => onChange(param.id, e.target.value)}
        className={styles.input}
      />
    </div>
  )
)

const ParamEditor = ({ params, model }: IProps) => {
  const [paramValues, setParamValues] = useState<IModel['paramValues']>([])
  const [displayedModel, setDisplayedModel] = useState<IModel | null>(null)

  useEffect(() => {
    setParamValues(model.paramValues)
  }, [model.paramValues])

  const handleInputChange = useCallback((paramId: number, value: string) => {
    setParamValues((currentParamValues) =>
      currentParamValues.map((paramValue) =>
        paramValue.paramId === paramId ? { ...paramValue, value } : paramValue
      )
    )
  }, [])

  const getModel = useCallback((): IModel => {
    return {
      ...model,
      paramValues,
    }
  }, [model, paramValues])

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault()
      const updatedModel = getModel()
      setDisplayedModel(updatedModel)
    },
    [getModel]
  )

  return (
    <div className={styles.paramEditorContainer}>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {params.map((param) => {
            const paramValue = paramValues.find((pv) => pv.paramId === param.id)?.value || ''

            return (
              <ParamInput
                key={param.id}
                param={param}
                value={paramValue}
                onChange={handleInputChange}
              />
            )
          })}

          <button type="submit">Отправить</button>
        </form>
      </div>

      <div>
        {displayedModel && (
          <div>
            <h3>Model data:</h3>
            <pre>{JSON.stringify(displayedModel, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default ParamEditor
