import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { isMobile } from '@deriv/shared';
import { connect } from 'Stores/connect';
import Notification, {
    max_display_notifications,
    max_display_notifications_mobile,
} from '../Components/Elements/NotificationMessage';
import 'Sass/app/_common/components/app-notification-message.scss';

const Portal = ({ children }) =>
    isMobile() ? ReactDOM.createPortal(children, document.getElementById('deriv_app')) : children;
const NotificationsContent = ({ style, notifications, removeNotificationMessage }) => (
    <div className='notification-messages' style={style}>
        <TransitionGroup component='div'>
            {notifications.map((notification, idx) => (
                <CSSTransition
                    appear
                    key={idx}
                    in={!!notification.header}
                    timeout={150}
                    classNames={{
                        appear: 'notification--enter',
                        enter: 'notification--enter',
                        enterDone: 'notification--enter-done',
                        exit: 'notification--exit',
                    }}
                    unmountOnExit
                >
                    <Notification data={notification} removeNotificationMessage={removeNotificationMessage} />
                </CSSTransition>
            ))}
        </TransitionGroup>
    </div>
);

const AppNotificationMessages = ({ marked_notifications, notification_messages, removeNotificationMessage }) => {
    const [style, setStyle] = React.useState({});
    const [notifications_ref, setNotificationsRef] = React.useState(null);

    React.useEffect(() => {
        if (notifications_ref && isMobile()) {
            const bounds = notifications_ref.parentElement.getBoundingClientRect();
            setStyle({ top: bounds.top + 8 });
        }
    }, [notifications_ref]);

    const notifications = notification_messages.filter(message => {
        const is_not_marked_notification = !marked_notifications.includes(message.key);
        const is_non_hidden_notification = isMobile()
            ? ['unwelcome', 'contract_sold', 'dp2p', 'tnc'].includes(message.key)
            : true;
        return is_not_marked_notification && is_non_hidden_notification;
    });

    const notifications_limit = isMobile() ? max_display_notifications_mobile : max_display_notifications;
    const notifications_sublist = notifications.slice(0, notifications_limit);

    return notifications_sublist.length ? (
        <div ref={ref => setNotificationsRef(ref)} className='notification-messages-bounds'>
            <Portal>
                <NotificationsContent
                    notifications={notifications_sublist}
                    style={style}
                    removeNotificationMessage={removeNotificationMessage}
                />
            </Portal>
        </div>
    ) : null;
};

AppNotificationMessages.propTypes = {
    marked_notifications: PropTypes.array,
    notification_messages: PropTypes.arrayOf(
        PropTypes.shape({
            closeOnClick: PropTypes.func,
            delay: PropTypes.number,
            header: PropTypes.string,
            is_auto_close: PropTypes.bool,
            message: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
            size: PropTypes.oneOf(['small']),
            type: PropTypes.oneOf(['warning', 'info', 'success', 'danger', 'contract_sold', 'news', 'announce']),
        })
    ),
    removeNotificationMessage: PropTypes.func,
};

export default connect(({ ui }) => ({
    marked_notifications: ui.marked_notifications,
    notification_messages: ui.notification_messages,
    removeNotificationMessage: ui.removeNotificationMessage,
}))(AppNotificationMessages);
