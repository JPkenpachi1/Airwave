# utils/logging.py

import logging

logger = logging.getLogger('user_activity')


def log_user_action(user, action, model_name, details=None):
    user_info = (
        f"User: {user.email if hasattr(user, 'email') else 'Anonymous'} "
        f"(ID: {user.id if hasattr(user, 'id') else 'N/A'})"
    )
    action_info = f"Action: {action}"
    model_info = f"Model: {model_name}"
    detail_info = f"Details: {details}" if details else ""
    logger.info(f"{user_info} | {action_info} | {model_info} | {detail_info}")
