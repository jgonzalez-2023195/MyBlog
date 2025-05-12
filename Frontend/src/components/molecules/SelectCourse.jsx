
import styled from 'styled-components'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { useCourse } from '../../hooks/useCourse'

export const SelectCourse = ({control, name, rules, error}) => {
    const { courses, isLoading, error: errorCourses } = useCourse()
    const options = courses.map((course) => ({
        value: course._id,
        label: course.name
    }))

    return (
        <Container>
            { isLoading ? (
                <LoadingMessage>Cargando cursos...</LoadingMessage>
            ) : errorCourses ? (
                <ErrorMessage>Error al cargar los cursos</ErrorMessage>
            ) : (
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field}) => (
                        <Select
                            {...field}
                            options={options}
                            placeholder="Selecciona un curso"
                            isClearable
                            onChange={(selectedOption) => field.onChange(selectedOption)}
                            value={field.value}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: error ? 'red' : base.borderColor,
                                }),
                            }}
                        />
                    )}
                />
            )}
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const Label = styled.label`
    font-size: 16px;
    font-weight: 500;
`

const ErrorMessage = styled.span`
    color: red;
    font-size: 14px;
`

const LoadingMessage = styled.span`
    font-size: 14px;
    color: gray;
`