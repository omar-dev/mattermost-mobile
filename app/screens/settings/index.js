// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {clearErrors} from 'mattermost-redux/actions/errors';
import {logout} from 'mattermost-redux/actions/users';
import {getCurrentUrl} from 'mattermost-redux/selectors/entities/general';
import {getJoinableTeams} from 'mattermost-redux/selectors/entities/teams';

import {getTheme} from 'app/selectors/preferences';
import {removeProtocol} from 'app/utils/url';

import Settings from './settings';

function mapStateToProps(state, ownProps) {
    const {config} = state.entities.general;

    return {
        ...ownProps,
        config,
        theme: getTheme(state),
        errors: state.errors,
        currentUserId: state.entities.users.currentUserId,
        currentTeamId: state.entities.teams.currentTeamId,
        currentUrl: removeProtocol(getCurrentUrl(state)),
        joinableTeams: getJoinableTeams(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            clearErrors,
            logout
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
