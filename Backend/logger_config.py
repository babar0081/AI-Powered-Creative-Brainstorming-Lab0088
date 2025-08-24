
import logging
import os
from logging.handlers import RotatingFileHandler


log_directory = "logs"
if not os.path.exists(log_directory):
    os.makedirs(log_directory)


log_formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')



responses_log_file = os.path.join(log_directory, "agent_responses.log")
# Added encoding='utf-8'
responses_handler = RotatingFileHandler(responses_log_file, maxBytes=10*1024*1024, backupCount=5, encoding='utf-8')
responses_handler.setFormatter(log_formatter)

responses_logger = logging.getLogger('AgentResponses')
responses_logger.setLevel(logging.INFO)
responses_logger.addHandler(responses_handler)
responses_logger.propagate = False 


errors_log_file = os.path.join(log_directory, "errors.log")
# Added encoding='utf-8'
errors_handler = RotatingFileHandler(errors_log_file, maxBytes=10*1024*1024, backupCount=5, encoding='utf-8')
errors_handler.setFormatter(log_formatter)

errors_logger = logging.getLogger('AppErrors')
errors_logger.setLevel(logging.ERROR)
errors_logger.addHandler(errors_handler)
errors_logger.propagate = False


debug_log_file = os.path.join(log_directory, "debug.log")
# Added encoding='utf-8'
debug_handler = RotatingFileHandler(debug_log_file, maxBytes=10*1024*1024, backupCount=5, encoding='utf-8')
debug_handler.setFormatter(log_formatter)

debug_logger = logging.getLogger('AppDebug')
debug_logger.setLevel(logging.DEBUG)
debug_logger.addHandler(debug_handler)
debug_logger.propagate = False