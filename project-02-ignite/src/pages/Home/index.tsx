import { useState, createContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { HandPalm, Play } from 'phosphor-react'
import { v4 as uuidv4 } from 'uuid'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  NewCycleForm,
  NewCycleFormDefaultValues,
  NewCycleFormValidatorSchema,
} from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import {
  FormErrorContainer,
  PomodoroFormContainer,
  StartButtonContainer,
  StopButtonContainer,
} from './styles'

type NewCycleFormData = zod.infer<typeof NewCycleFormValidatorSchema>

interface PomodoroCycle {
  id: string
  minutesAmount: number
  taskName: string
  startDate: Date
  interruptedDate?: Date
  concludedDate?: Date
}

interface ActivePomodoroCycleContextModel {
  activeCycle: PomodoroCycle | undefined
  secondsPassed: number
  onComplete: () => void
  onSecondsPassedChange: (newValue: number) => void
}

export const ActivePomodoroCycleContext = createContext(
  {} as ActivePomodoroCycleContextModel,
)

export function Home() {
  const NewCycleFormContext = useForm<NewCycleFormData>({
    resolver: zodResolver(NewCycleFormValidatorSchema),
    defaultValues: NewCycleFormDefaultValues,
  })

  const [pomodoroCycles, setPomodoroCycles] = useState<Array<PomodoroCycle>>([])
  const [activePomodoroCycleId, setActivePomodoroCycleId] = useState<
    string | null
  >(null)
  const [
    activePomodoroCycleSecondsPassed,
    setActivePomodoroCycleSecondsPassed,
  ] = useState(0)

  function updateActivePomodoroCycleSecondsPassed(newValue: number) {
    setActivePomodoroCycleSecondsPassed(newValue)
  }

  const activePomodoroCycle = pomodoroCycles.find((pomodoroCycle) => {
    return pomodoroCycle.id === activePomodoroCycleId
  })

  function resetPageTitle() {
    document.title = 'Ignite Project 02 - @dwtoledo'
  }

  function handleNewPomodoroCycle(data: NewCycleFormData) {
    const newPomodoroCycle: PomodoroCycle = {
      id: uuidv4(),
      minutesAmount: data.minutesAmount,
      taskName: data.cycleName,
      startDate: new Date(),
    }
    setPomodoroCycles((state) => [...state, newPomodoroCycle])
    setActivePomodoroCycleId(newPomodoroCycle.id)
    setActivePomodoroCycleSecondsPassed(0)
    NewCycleFormContext.reset()
  }

  function handleInterruptPomodoroCycle() {
    setPomodoroCycles((state) =>
      state.map((pomodoroCycle) => {
        if (pomodoroCycle.id === activePomodoroCycle?.id) {
          return { ...pomodoroCycle, interruptedDate: new Date() }
        } else {
          return pomodoroCycle
        }
      }),
    )
    setActivePomodoroCycleId(null)
    setActivePomodoroCycleSecondsPassed(0)
    resetPageTitle()
  }

  function completePomodoroCycle() {
    setPomodoroCycles((state) =>
      state.map((pomodoroCycle) => {
        if (pomodoroCycle.id === activePomodoroCycle?.id) {
          return { ...pomodoroCycle, concludedDate: new Date() }
        } else {
          return pomodoroCycle
        }
      }),
    )
    setActivePomodoroCycleId(null)
    setActivePomodoroCycleSecondsPassed(0)
    resetPageTitle()
  }

  return (
    <PomodoroFormContainer
      onSubmit={NewCycleFormContext.handleSubmit(handleNewPomodoroCycle)}
    >
      <ActivePomodoroCycleContext.Provider
        value={{
          activeCycle: activePomodoroCycle,
          secondsPassed: activePomodoroCycleSecondsPassed,
          onComplete: completePomodoroCycle,
          onSecondsPassedChange: updateActivePomodoroCycleSecondsPassed,
        }}
      >
        <FormProvider {...NewCycleFormContext}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />
      </ActivePomodoroCycleContext.Provider>

      {activePomodoroCycle ? (
        <StopButtonContainer
          onClick={handleInterruptPomodoroCycle}
          type="button"
        >
          <HandPalm size={24} />
          Stop {activePomodoroCycle.taskName}
        </StopButtonContainer>
      ) : (
        <StartButtonContainer type="submit">
          <Play size={24} />
          Start
        </StartButtonContainer>
      )}

      {Object.keys(NewCycleFormContext.formState.errors).length ? (
        <FormErrorContainer>
          {Object.keys(NewCycleFormContext.formState.errors).map(
            (fieldError) => {
              return (
                <p key={uuidv4()}>
                  {
                    NewCycleFormContext.formState.errors[
                      fieldError as keyof NewCycleFormData
                    ]?.message
                  }
                </p>
              )
            },
          )}
        </FormErrorContainer>
      ) : (
        <div></div>
      )}
    </PomodoroFormContainer>
  )
}
