import {utilsDom} from './utils/utils-dom';
import {Plot} from './charts/tau.plot';
import {Chart} from './charts/tau.chart';
import {UnitDomainMixin} from './unit-domain-mixin';
import {UnitDomainPeriodGenerator} from './unit-domain-period-generator';
import {DSLReader} from './dsl-reader';
import {SpecEngineFactory} from './spec-engine-factory';
import {LayoutEngineFactory} from './layout-engine-factory';
import {FormatterRegistry} from './formatter-registry';
import {nodeMap} from './node-map';
import {UnitsRegistry} from './units-registry';
var colorBrewers = {};
var plugins = {};

var __api__ = {
    UnitDomainMixin: UnitDomainMixin,
    UnitDomainPeriodGenerator: UnitDomainPeriodGenerator,
    DSLReader: DSLReader,
    SpecEngineFactory: SpecEngineFactory,
    LayoutEngineFactory: LayoutEngineFactory
};
var api = {
    UnitsRegistry: UnitsRegistry,
    tickFormat: FormatterRegistry,
    d3: d3,
    _: _,
    tickPeriod: UnitDomainPeriodGenerator,
    colorBrewers: {
        add: function (name, brewer) {
            if (!(name in colorBrewers)) {
                colorBrewers[name] = brewer;
            }
        },
        get: function (name) {
            return colorBrewers[name];
        }
    },
    plugins: {
        add: function (name, brewer) {
            if (!(name in plugins)) {
                plugins[name] = brewer;
            } else {
                throw new Error('Plugins is already registred.');
            }
        },
        get: function (name) {
            return plugins[name];
        }
    },
    globalSettings: {

        log: (msg, type) => {
            type = type || 'INFO';
            if(!Array.isArray(msg)) {
                msg = [msg];
            }
            console[type.toLowerCase()].apply(console, msg);
        },

        excludeNull: true,
        specEngine: [
            {
                name: 'COMPACT',
                width: 600
            },
            {
                name: 'AUTO',
                width: Number.MAX_VALUE
            }
        ],
        layoutEngine: 'EXTRACT',
        getAxisTickLabelSize: utilsDom.getAxisTickLabelSize,

        xAxisTickLabelLimit: 100,
        yAxisTickLabelLimit: 100,

        xTickWordWrapLinesLimit: 2,
        yTickWordWrapLinesLimit: 2,

        xTickWidth: 6 + 3,
        yTickWidth: 6 + 3,

        distToXAxisLabel: 20,
        distToYAxisLabel: 20,

        xAxisPadding: 20,
        yAxisPadding: 20,

        xFontLabelHeight: 10,
        yFontLabelHeight: 10,

        'xDensityPadding': 4,
        'yDensityPadding': 4,
        'xDensityPadding:measure': 8,
        'yDensityPadding:measure': 8,

        defaultFormats: {
            'measure': 'x-num-auto',
            'measure:time'          : 'x-time-auto',
            'measure:time:year'     : 'year',
            'measure:time:quarter'  : 'quarter',
            'measure:time:month'    : 'month',
            'measure:time:week'     : 'x-time-auto',
            'measure:time:day'      : 'x-time-auto',
            'measure:time:hour'     : 'x-time-auto',
            'measure:time:min'      : 'x-time-auto',
            'measure:time:sec'      : 'x-time-auto',
            'measure:time:ms'       : 'x-time-auto'
        }
    }
};

Plot.globalSettings = api.globalSettings;

api.UnitsRegistry
    .add('COORDS.PARALLEL', nodeMap['COORDS.PARALLEL'])
    .add('PARALLEL/ELEMENT.LINE', nodeMap['PARALLEL/ELEMENT.LINE'])
    .add('COORDS.RECT', nodeMap['COORDS.RECT'])
    .add('ELEMENT.POINT', nodeMap['ELEMENT.POINT'])
    .add('ELEMENT.LINE', nodeMap['ELEMENT.LINE'])
    .add('ELEMENT.INTERVAL', nodeMap['ELEMENT.INTERVAL']);
export {Plot, Chart, __api__, api};



