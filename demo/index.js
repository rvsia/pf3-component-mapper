/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import FormRenderer from '@data-driven-forms/react-form-renderer';
import { Grid, Row } from 'patternfly-react';
import { formFieldsMapper, layoutMapper } from '../src'
import { schema, uiSchema, conditionalSchema, arraySchema, uiArraySchema } from './demo-schemas/widget-schema';
import miqSchema from './demo-schemas/miq-schema'

const App = () => (
    <div>
        <h1>Pf3 component mapper</h1>
        <Grid>
            <Row>
                <FormRenderer
                    onSubmit={console.log}
                    schemaType="miq"
                    formFieldsMapper={formFieldsMapper}
                    layoutMapper={layoutMapper}
                    schema={miqSchema}
                />
            </Row>
        </Grid>
    </div>
)

ReactDOM.render(<App />, document.getElementById('root'));
