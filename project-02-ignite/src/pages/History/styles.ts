import styled from 'styled-components'

export const HistoryContainer = styled.main`
  margin: 0px 3.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: auto;

  h1 {
    font-size: 1.625rem;
    font-weight: 700;
  }
`

export const HistoryTable = styled.div`
  margin-top: 2rem;
  min-width: 600px;

  table {
    width: 100%;
    text-align: left;
    font-size: 0.875rem;

    thead th {
      background-color: ${(props) => props.theme['gray-300']};
      padding: 1rem 0;
      font-weight: 700;

      &:first-child {
        width: 50%;
        padding-left: 1.5rem;
        border-top-left-radius: 8px;
      }

      &:last-child {
        padding-right: 1.5rem;
        border-top-right-radius: 8px;
      }
    }

    tbody td {
      background-color: ${(props) => props.theme['gray-250']};
      border-top: 4px solid ${(props) => props.theme['gray-200']};
      padding: 1rem 0;

      &:first-child {
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }

    tbody tr:last-child {
      td:first-child {
        border-bottom-left-radius: 8px;
      }

      td:last-child {
        border-bottom-right-radius: 8px;
      }
    }
  }
`

const CYCLE_STATUS_COLORS = {
  completed: 'green',
  inProgress: 'yellow',
  stopped: 'red',
} as const

interface CycleStatusProps {
  statusColor: keyof typeof CYCLE_STATUS_COLORS
}

export const CycleStatus = styled.span<CycleStatusProps>`
  display: flex;
  gap: 0.5rem;
  align-items: center;

  &::before {
    content: '';
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: ${(props) =>
      props.theme[CYCLE_STATUS_COLORS[props.statusColor]]};
  }
`
