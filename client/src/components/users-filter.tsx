import { Badge, Button, Form, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import { usersFilterDepProp, usersFilterStrProp } from "../store";
import { persistantProp } from "../store/persistant";
import { DEPARTMENTS } from "../abstract";
import { unitColor, unitDescription } from "../utils";
import { useProperty } from "../hoc/use-property";

const FilterDepartments = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
  `;

const Container = styled.div`
`;

export const UsersFilter = () => {
    const usersFilterStr = useProperty(usersFilterStrProp);
    const usersFilterDep = useProperty(usersFilterDepProp);
    return (
        <Container>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Фильтр"
                    aria-label="Filter"
                    aria-describedby="clear-filter-btn"
                    value={usersFilterStr}
                    onChange={({ target: { value } }) => persistantProp.usersFilterText(value)}
                />
                <Button variant="outline-secondary" id="clear-filter-btn" onClick={() => {
                    persistantProp.usersFilterText('');
                    const currentDep = usersFilterDepProp.get();
                    currentDep !== undefined && persistantProp.usersFilterDep(currentDep);
                }}>
                    X
                </Button>
            </InputGroup>
            <FilterDepartments className="m-2">
                {DEPARTMENTS.map(dep =>
                    <Badge
                        key={dep}
                        bg={unitColor[dep]}
                        className="m-1"
                        style={({
                            'opacity': usersFilterDep === dep ? 1 : 0.6,
                            cursor: 'pointer',
                            border: usersFilterDep === dep ? '3px solid black' : '3px solid transparent'
                        })}
                        onClick={() => persistantProp.usersFilterDep(dep)}
                    >
                        {unitDescription[dep]}
                    </Badge>)}
            </FilterDepartments>
        </Container>)
}